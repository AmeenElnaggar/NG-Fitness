import { Component } from '@angular/core';
import { MaterialModule } from '../../../../Core/modules/material.module';

@Component({
  selector: 'app-welcome',
  imports: [MaterialModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {}
