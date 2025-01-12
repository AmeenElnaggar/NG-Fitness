import { inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  onSnapshot,
} from '@angular/fire/firestore';

import { Exercise } from '../models/exercise.model';
import { UiService } from '../../../Shared/Services/ui.service';

import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { startLoading, stopLoading } from '../../../Store/actions/ui.actions';
import {
  setAvaliableTrainings,
  setFinishedTrainings,
  startTraining,
  stopTraining,
} from '../../../Store/actions/training.actions';
import { activeTrainingsSelector } from '../../../Store/selectors/training.selectors';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private unSubscribeFromFirestore: (() => void)[] = [];
  private uiService = inject(UiService);
  private db = inject(Firestore);
  private store = inject(Store<StoreInterface>);
  exercisesChanged = signal<Exercise[] | null>([]);

  private runningExercise = signal<Exercise | undefined>(undefined);
  theRunningExercise = this.runningExercise.asReadonly();
  exerciseChanged = signal<Exercise | undefined>(undefined);

  private finishedexercises = signal<Exercise[]>([]);
  allFinishedExercises = this.finishedexercises.asReadonly();
  finishedExercisesChanged = signal<Exercise[]>([]);

  // 1
  fetchAvaliableExercises() {
    this.store.dispatch(startLoading());
    const collectionRef = collection(this.db, 'avaliableExercises');

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      try {
        // throw new Error();
        const dataChanges = snapshot.docs.map((docDataChanged) => {
          return { id: docDataChanged.id, ...docDataChanged.data() };
        }) as Exercise[];

        this.store.dispatch(stopLoading());
        this.store.dispatch(setAvaliableTrainings({ exercises: dataChanges }));
      } catch (error) {
        this.store.dispatch(stopLoading());
        this.exercisesChanged.set(null);
        this.uiService.showSnackbar(
          `Fetching exercises failed, please try again later`,
          3000
        );
      }
    });

    this.unSubscribeFromFirestore.push(unsubscribe);
  }

  startExercise(selectedId: string) {
    this.store.dispatch(startTraining({ selectedExerciseId: selectedId }));
  }

  completeCurrentExercise() {
    this.store
      .select(activeTrainingsSelector)
      .pipe(take(1))
      .subscribe((ex) => {
        const exercise: Exercise = {
          ...ex!,
          date: new Date(),
          state: 'completed',
        };
        this.addDataToDatabase(exercise);
        this.store.dispatch(stopTraining());
      });
  }

  cancelCurrentExercise(progress: number) {
    this.store
      .select(activeTrainingsSelector)
      .pipe(take(1))
      .subscribe((ex) => {
        const exercise: Exercise = {
          ...ex!,
          calories: ex!.calories * (progress / 100),
          duration: ex!.duration * (progress / 100),
          date: new Date(),
          state: 'cancelled',
        };
        this.addDataToDatabase(exercise);
        this.store.dispatch(stopTraining());
      });
  }

  private addDataToDatabase(exercise: Exercise) {
    const collectionRef = collection(this.db, 'finishedExercises');
    addDoc(collectionRef, exercise);
  }
  // 2
  fetchCompletedOrCancelledExercises() {
    const collectionRef = collection(this.db, 'finishedExercises');

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      try {
        const completeOrCancelledExercise = snapshot.docs.map(
          (exerciseChanges) => {
            return {
              id: exerciseChanges.id,
              ...exerciseChanges.data(),
              date: exerciseChanges.data()['date'].toDate(),
            };
          }
        ) as Exercise[];
        this.store.dispatch(
          setFinishedTrainings({ exercises: completeOrCancelledExercise })
        );
      } catch {
        this.store.dispatch(stopLoading());
        this.uiService.showSnackbar(
          `Fetching finished exercises failed, please try again later`,
          3000
        );
      }
    });

    this.unSubscribeFromFirestore.push(unsubscribe);
  }

  cancelFetchingDataFromDatabase() {
    this.unSubscribeFromFirestore.forEach((unsubscribe) => unsubscribe());
    this.unSubscribeFromFirestore = [];
  }
}
