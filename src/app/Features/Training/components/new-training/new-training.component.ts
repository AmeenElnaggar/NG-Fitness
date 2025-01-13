import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { MaterialModule } from '../../../../Core/modules/material.module';

import { TrainingService } from '../../services/training.service';
import { Exercise } from '../../models/exercise.model';

import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { uiSelector } from '../../../../Store/selectors/ui.selector';
import { avaliableTrainingsSelector } from '../../../../Store/selectors/training.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  imports: [MaterialModule, AsyncPipe],
  standalone: true,
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css',
})
export class NewTrainingComponent {
  private trainingService = inject(TrainingService);
  private store = inject(Store<StoreInterface>);
  exercises$: Observable<Exercise[]> = this.store.select(
    avaliableTrainingsSelector
  );

  isLoading$: Observable<boolean> = this.store.select(uiSelector);

  ngOnInit() {
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvaliableExercises();
  }

  myForm = new FormGroup({
    exercise: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onStartTraining() {
    this.trainingService.startExercise(this.myForm.controls.exercise.value!);
  }
}
