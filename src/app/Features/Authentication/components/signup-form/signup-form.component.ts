import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { MaterialModule } from '../../../../Core/modules/material.module';

import { AuthService } from '../../../../Shared/Services/auth.service';
import { ValidationService } from '../../services/validation.service';

import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { uiSelector } from '../../../../Store/selectors/ui.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup-form',
  imports: [MaterialModule, AsyncPipe],
  standalone: true,

  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent implements OnInit {
  private authService = inject(AuthService);
  private validationService = inject(ValidationService);
  private store = inject(Store<StoreInterface>);

  isLoading$: Observable<boolean> = this.store.select(uiSelector);

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
