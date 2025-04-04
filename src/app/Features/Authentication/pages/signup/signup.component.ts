import { Component } from '@angular/core';

import { SignupFormComponent } from '../../components/signup-form/signup-form.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone: true,

  imports: [SignupFormComponent],
})
export class SignupComponent {}
