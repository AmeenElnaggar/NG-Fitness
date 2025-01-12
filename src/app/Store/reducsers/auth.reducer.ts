import { createReducer, on } from '@ngrx/store';
import { setAuthenticated, setUnAuthenticated } from '../actions/auth.action';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(setAuthenticated, (state, action) => {
    return { isAuthenticated: true };
  }),
  on(setUnAuthenticated, (state, action) => {
    return { isAuthenticated: false };
  })
);
