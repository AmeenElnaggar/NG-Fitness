import { createReducer, on } from '@ngrx/store';
import { Exercise } from '../../Features/Training/models/exercise.model';
import {
  setAvaliableTrainings,
  setFinishedTrainings,
  startTraining,
  stopTraining,
} from '../actions/training.actions';

export interface State {
  avaliableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeExercise: Exercise | null;
}

const initialState: State = {
  avaliableExercises: [],
  finishedExercises: [],
  activeExercise: null,
};

export const trainingReducer = createReducer(
  initialState,
  on(setAvaliableTrainings, (state, action) => {
    return { ...state, avaliableExercises: action.exercises };
  }),
  on(setFinishedTrainings, (state, action) => {
    return { ...state, finishedExercises: action.exercises };
  }),
  on(startTraining, (state, action) => {
    const selectedExercise: Exercise = {
      ...state.avaliableExercises.find(
        (exercise) => exercise.id === action.selectedExerciseId
      )!,
    };

    return { ...state, activeExercise: selectedExercise };
  }),
  on(stopTraining, (state, action) => {
    return { ...state, activeExercise: null };
  })
);
