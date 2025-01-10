import { Component, effect, inject, signal } from '@angular/core';
import { NewTrainingComponent } from '../../components/new-training/new-training.component';
import { PastTrainingComponent } from '../../components/past-training/past-training.component';
import { CurrentTrainingComponent } from '../../components/current-training/current-training.component';
import { TrainingService } from '../../services/training.service';
import { MaterialModule } from '../../../../Core/modules/material.module';

@Component({
  selector: 'app-training',
  imports: [
    MaterialModule,
    NewTrainingComponent,
    PastTrainingComponent,
    CurrentTrainingComponent,
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css',
})
export class TrainingComponent {
  private trainingService = inject(TrainingService);
  onGoingTraining = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.trainingService.exerciseChanged() === undefined) {
        this.onGoingTraining.set(false);
      } else {
        this.onGoingTraining.set(true);
      }
    });
  }
  onCloseCurrentTraining() {
    this.onGoingTraining.set(false);
  }
}
