import { inject, Injectable, signal } from '@angular/core';
import { Exercise } from '../models/exercise.model';
import {
  addDoc,
  collection,
  Firestore,
  onSnapshot,
} from '@angular/fire/firestore';
import { UiService } from '../../../Shared/Services/ui.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private unSubscribeFromFirestore: (() => void)[] = [];
  private uiService = inject(UiService);
  private db = inject(Firestore);
  private avaliableExercises = signal<Exercise[]>([]);
  exercisesChanged = signal<Exercise[] | null>([]);

  fetchAvaliableExercises() {
    this.uiService.loadingStateChanged.set(true);
    const collectionRef = collection(this.db, 'avaliableExercises');

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      try {
        // throw new Error();
        const dataChanges = snapshot.docs.map((docDataChanged) => {
          return { id: docDataChanged.id, ...docDataChanged.data() };
        }) as Exercise[];

        this.avaliableExercises.set(dataChanges);
        this.exercisesChanged.set(this.avaliableExercises());
        this.uiService.loadingStateChanged.set(false);
      } catch (error) {
        this.exercisesChanged.set(null);
        this.uiService.loadingStateChanged.set(false);
        this.uiService.showSnackbar(
          `Fetching exercises failed, please try again later`,
          3000
        );
      }
    });

    this.unSubscribeFromFirestore.push(unsubscribe);
  }

  //****************************************** */
  private runningExercise = signal<Exercise | undefined>(undefined);
  theRunningExercise = this.runningExercise.asReadonly();
  exerciseChanged = signal<Exercise | undefined>(undefined);

  //****************************************** */
  private finishedexercises = signal<Exercise[]>([]);
  allFinishedExercises = this.finishedexercises.asReadonly();
  finishedExercisesChanged = signal<Exercise[]>([]);

  startExercise(selectedId: string) {
    const selectedExercise = this.avaliableExercises().find(
      (ex) => ex.id === selectedId
    );
    this.runningExercise.set(selectedExercise);
    this.exerciseChanged.set(selectedExercise);
  }

  completeCurrentExercise() {
    const exercise: Exercise = {
      ...this.runningExercise()!,
      date: new Date(),
      state: 'completed',
    };
    this.addDataToDatabase(exercise);
    this.runningExercise.set(undefined);
    this.exerciseChanged.set(undefined);
  }

  cancelCurrentExercise(progress: number) {
    const exercise: Exercise = {
      ...this.runningExercise()!,
      calories: this.runningExercise()!.calories * (progress / 100),
      duration: this.runningExercise()!.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    };
    this.addDataToDatabase(exercise);
    this.runningExercise.set(undefined);
    this.exerciseChanged.set(undefined);
  }

  private addDataToDatabase(exercise: Exercise) {
    const collectionRef = collection(this.db, 'finishedExercises');
    addDoc(collectionRef, exercise);
  }

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
        this.finishedExercisesChanged.set(completeOrCancelledExercise);
      } catch {
        this.uiService.loadingStateChanged.set(false);
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
