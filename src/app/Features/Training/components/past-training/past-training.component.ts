import { DatePipe, DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../../../Core/modules/material.module';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { TrainingService } from '../../services/training.service';
import { Exercise } from '../../models/exercise.model';

import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { finishedTrainingsSelector } from '../../../../Store/selectors/training.selectors';

@Component({
  selector: 'app-past-training',
  imports: [FormsModule, DatePipe, DecimalPipe, MaterialModule],
  templateUrl: './past-training.component.html',
  styleUrl: './past-training.component.css',
})
export class PastTrainingComponent implements AfterViewInit, OnInit {
  private trainingService = inject(TrainingService);
  private store = inject(Store<StoreInterface>);

  displayedColumns: string[] = [
    'date',
    'name',
    'calories',
    'duration',
    'state',
  ];
  dataSource = new MatTableDataSource<Exercise>();

  sort = viewChild<MatSort>(MatSort);
  paginator = viewChild<MatPaginator>(MatPaginator);
  filterValue = signal<string>('');

  ngOnInit(): void {
    this.trainingService.fetchCompletedOrCancelledExercises();
    this.store.select(finishedTrainingsSelector).subscribe((result) => {
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort()!;
    this.dataSource.paginator = this.paginator()!;
  }

  doFilter() {
    this.dataSource.filter = this.filterValue().trim().toLowerCase();
  }
}
