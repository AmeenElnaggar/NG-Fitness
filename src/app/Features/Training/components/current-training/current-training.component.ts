import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../../services/training.service';
import { MaterialModule } from '../../../../Core/modules/material.module';

@Component({
  selector: 'app-current-training',
  imports: [MaterialModule, StopTrainingComponent],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.css',
})
export class CurrentTrainingComponent implements OnInit {
  private trainingService = inject(TrainingService);
  private dialog = inject(MatDialog);

  progress = signal<number>(0);
  timer: any;

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const stepTimer: number =
      (this.trainingService.theRunningExercise()!.duration / 100) * 1000;

    this.timer = setInterval(() => {
      this.progress.update((oldValue) => oldValue + 1);
      if (this.progress() >= 100) {
        this.trainingService.completeCurrentExercise();
        clearInterval(this.timer);
      }
    }, stepTimer);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelCurrentExercise(this.progress());
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
