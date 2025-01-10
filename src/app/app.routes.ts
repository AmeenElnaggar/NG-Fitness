import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Features/Welcome/pages/welcome/welcome.component').then(
        (com) => com.WelcomeComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Features/Authentication/pages/login/login.component').then(
        (com) => com.LoginComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./Features/Authentication/pages/signup/signup.component').then(
        (com) => com.SignupComponent
      ),
  },
  {
    path: 'training',
    loadComponent: () =>
      import('./Features/Training/pages/training/training.component').then(
        (com) => com.TrainingComponent
      ),
    canMatch: [authGuard],
  },
];
