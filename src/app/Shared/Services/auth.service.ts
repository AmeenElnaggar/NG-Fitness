import { inject, Injectable, signal } from '@angular/core';
import { AuthData } from '../../Features/Authentication/models/authData.model';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { TrainingService } from '../../Features/Training/services/training.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private afauth = inject(Auth);
  private isAuthenticated = signal<boolean>(false);
  private trainingService = inject(TrainingService);
  private uiService = inject(UiService);

  authChange = signal<boolean>(false);

  initAuthListener() {
    onAuthStateChanged(this.afauth, (user) => {
      if (user) {
        this.isAuthenticated.set(true);
        this.authChange.set(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelFetchingDataFromDatabase();
        this.authChange.set(false);
        this.isAuthenticated.set(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.set(true);
    createUserWithEmailAndPassword(
      this.afauth,
      authData.email,
      authData.password
    )
      .then((result) => {
        this.uiService.loadingStateChanged.set(false);
      })
      .catch((error: Error) => {
        this.uiService.loadingStateChanged.set(false);
        this.uiService.showSnackbar(error.message, 3000);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.set(true);
    signInWithEmailAndPassword(this.afauth, authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChanged.set(false);
      })
      .catch((error: Error) => {
        this.uiService.loadingStateChanged.set(false);
        this.uiService.showSnackbar(error.message, 3000);
      });
  }

  logout() {
    signOut(this.afauth);
  }

  isAuth() {
    return this.isAuthenticated();
  }
}
