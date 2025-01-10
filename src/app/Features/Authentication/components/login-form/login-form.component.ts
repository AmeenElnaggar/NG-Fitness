import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../Shared/Services/auth.service';
import { ValidationService } from '../../services/validation.service';
import { UiService } from '../../../../Shared/Services/ui.service';
import { MaterialModule } from '../../../../Core/modules/material.module';

@Component({
  selector: 'app-login-form',
  imports: [MaterialModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private validationService = inject(ValidationService);
  private uiService = inject(UiService);

  isLoading = signal<boolean>(false);

  constructor() {
    effect(() => this.isLoading.set(this.uiService.loadingStateChanged()));
  }

  myForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),

    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get emailIsInvalid() {
    return !this.validationService.controlFieldIsInvalid(this.myForm, 'email');
  }

  onSubmit() {
    this.authService.login({
      email: this.myForm.controls.email.value!,
      password: this.myForm.controls.password.value!,
    });
  }
}
