import { createAction, props } from '@ngrx/store';
import { Exercise } from '../../Features/Training/models/exercise.model';

export const setAvaliableTrainings = createAction(
  '[Training] Set Avaliable Trainings',
  props<{ exercises: Exercise[] }>()
);
export const setFinishedTrainings = createAction(
  '[Training] Set Finished Trainings',
  props<{ exercises: Exercise[] }>()
);
export const startTraining = createAction(
  '[Training] Start Training',
  props<{ selectedExerciseId: string }>()
);
export const stopTraining = createAction('[Training] Stop Training');
