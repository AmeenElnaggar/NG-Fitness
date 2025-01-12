import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '@angular/fire/auth';

import { AuthData } from '../../Features/Authentication/models/authData.model';
import { TrainingService } from '../../Features/Training/services/training.service';
import { UiService } from './ui.service';

import { Store } from '@ngrx/store';
import { StoreInterface } from '../../Store/store';
import { startLoading, stopLoading } from '../../Store/actions/ui.actions';
import {
  setAuthenticated,
  setUnAuthenticated,
} from '../../Store/actions/auth.action';
import { authSelector } from '../../Store/selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private afauth = inject(Auth);
  private trainingService = inject(TrainingService);
  private uiService = inject(UiService);
  private store = inject(Store<StoreInterface>);

  initAuthListener() {
    onAuthStateChanged(this.afauth, (user) => {
      if (user) {
        this.store.dispatch(setAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelFetchingDataFromDatabase();
        this.store.dispatch(setUnAuthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(startLoading());
    createUserWithEmailAndPassword(
      this.afauth,
      authData.email,
      authData.password
    )
      .then((result) => {
        this.store.dispatch(stopLoading());
      })
      .catch((error: Error) => {
        this.store.dispatch(stopLoading());
        this.uiService.showSnackbar(error.message, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(startLoading());
    signInWithEmailAndPassword(this.afauth, authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(stopLoading());
      })
      .catch((error: Error) => {
        this.store.dispatch(stopLoading());
        this.uiService.showSnackbar(error.message, 3000);
      });
  }

  logout() {
    signOut(this.afauth);
  }

  isAuth() {
    let isAuth: boolean = false;
    this.store.select(authSelector).subscribe((res) => {
      isAuth = res;
    });
    return isAuth;
  }
}
