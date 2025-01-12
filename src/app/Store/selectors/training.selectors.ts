import { createSelector } from '@ngrx/store';
import { StoreInterface } from '../store';

export const avaliableTrainingsSelector = (state: StoreInterface) =>
  state.trainings.avaliableExercises;
export const finishedTrainingsSelector = (state: StoreInterface) =>
  state.trainings.finishedExercises;
export const activeTrainingsSelector = (state: StoreInterface) =>
  state.trainings.activeExercise;
export const isTrainingSelector = createSelector(
  activeTrainingsSelector,
  (state) => {
    return state !== null;
  }
);
