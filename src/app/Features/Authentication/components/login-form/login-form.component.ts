import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { MaterialModule } from '../../../../Core/modules/material.module';

import { AuthService } from '../../../../Shared/Services/auth.service';
import { ValidationService } from '../../services/validation.service';

import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { Observable } from 'rxjs';
import { uiSelector } from '../../../../Store/selectors/ui.selector';

@Component({
  selector: 'app-login-form',
  imports: [MaterialModule, AsyncPipe],
  standalone: true,

  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
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
