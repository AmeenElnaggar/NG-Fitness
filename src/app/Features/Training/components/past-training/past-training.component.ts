import { DatePipe, DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Exercise } from '../../models/exercise.model';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from '../../../../Core/modules/material.module';

@Component({
  selector: 'app-past-training',
  imports: [FormsModule, DatePipe, DecimalPipe, MaterialModule],
  templateUrl: './past-training.component.html',
  styleUrl: './past-training.component.css',
})
export class PastTrainingComponent implements AfterViewInit, OnInit {
  private trainingService = inject(TrainingService);

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

  constructor() {
    effect(() => {
      this.dataSource.data = this.trainingService.finishedExercisesChanged();
    });
  }

  ngOnInit(): void {
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort()!;
    this.dataSource.paginator = this.paginator()!;
  }

  doFilter() {
    this.dataSource.filter = this.filterValue().trim().toLowerCase();
  }
}
