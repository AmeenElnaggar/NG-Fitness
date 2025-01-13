import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { NewTrainingComponent } from '../../components/new-training/new-training.component';
import { PastTrainingComponent } from '../../components/past-training/past-training.component';
import { CurrentTrainingComponent } from '../../components/current-training/current-training.component';
import { TrainingService } from '../../services/training.service';

import { MaterialModule } from '../../../../Core/modules/material.module';

import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { isTrainingSelector } from '../../../../Store/selectors/training.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  imports: [
    MaterialModule,
    NewTrainingComponent,
    PastTrainingComponent,
    CurrentTrainingComponent,
    AsyncPipe,
  ],
  standalone: true,
  templateUrl: './training.component.html',
  styleUrl: './training.component.css',
})
export class TrainingComponent {
  private trainingService = inject(TrainingService);
  private store = inject(Store<StoreInterface>);
  onGoingTraining$: Observable<boolean> = this.store.select(isTrainingSelector);
}
