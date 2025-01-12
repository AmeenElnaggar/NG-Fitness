import { createReducer, on } from '@ngrx/store';
import { startLoading, stopLoading } from '../actions/ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export const uiReducer = createReducer(
  initialState,
  on(startLoading, (state, action) => {
    return {
      isLoading: true,
    };
  }),
  on(stopLoading, (state, action) => {
    return {
      isLoading: false,
    };
  })
);
