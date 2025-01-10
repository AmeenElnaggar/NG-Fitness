import { Component, effect, inject, signal } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { Exercise } from '../../models/exercise.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiService } from '../../../../Shared/Services/ui.service';
import { MaterialModule } from '../../../../Core/modules/material.module';

@Component({
  selector: 'app-new-training',
  imports: [MaterialModule],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css',
})
export class NewTrainingComponent {
  private trainingService = inject(TrainingService);
  private uiService = inject(UiService);
  exercises = signal<Exercise[] | null>(null);

  isLoading = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.isLoading.set(this.uiService.loadingStateChanged());
      this.exercises.set(this.trainingService.exercisesChanged());
    });
  }

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
