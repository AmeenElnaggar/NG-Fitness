import { ActionReducerMap } from '@ngrx/store';
import * as fromUi from './reducsers/ui.reducer';
import * as fromAuth from './reducsers/auth.reducer';
import * as fromTrainings from './reducsers/training.reducer';

export interface StoreInterface {
  ui: fromUi.State;
  auth: fromAuth.State;
  trainings: fromTrainings.State;
}

export const reducers: ActionReducerMap<StoreInterface> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
  trainings: fromTrainings.trainingReducer,
};
