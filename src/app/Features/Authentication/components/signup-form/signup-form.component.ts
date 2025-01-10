import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../Shared/Services/auth.service';
import { ValidationService } from '../../services/validation.service';
import { UiService } from '../../../../Shared/Services/ui.service';
import { MaterialModule } from '../../../../Core/modules/material.module';

@Component({
  selector: 'app-signup-form',
  imports: [MaterialModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent implements OnInit {
  private authService = inject(AuthService);
  private validationService = inject(ValidationService);

  private uiService = inject(UiService);

  isLoading = signal<boolean>(false);

  myForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),

    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),

    birthdate: new FormControl('', {
      validators: [Validators.required],
    }),

    checkbox: new FormControl(false, {
      validators: [Validators.required],
    }),
  });
  maxDate = signal<any>(0);

  constructor() {
    effect(() => this.isLoading.set(this.uiService.loadingStateChanged()));
  }

  ngOnInit(): void {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 16);
    this.maxDate.set(currentDate);
  }

  get emailIsInvalid() {
    return this.validationService.controlFieldIsInvalid(this.myForm, 'email');
  }

  get passwordIsInvalid() {
    return !this.validationService.controlFieldIsInvalid(
      this.myForm,
      'password'
    );
  }

  onSubmit() {
    this.authService.registerUser({
      email: this.myForm.controls.email.value!,
      password: this.myForm.controls.password.value!,
    });
  }
}
