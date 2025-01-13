import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from '../../../../Core/modules/material.module';

@Component({
  selector: 'app-stop-training',
  imports: [MaterialModule],
  standalone: true,
  templateUrl: './stop-training.component.html',
  styleUrl: './stop-training.component.css',
})
export class StopTrainingComponent {
  public passedData: any = inject(MAT_DIALOG_DATA);
}
