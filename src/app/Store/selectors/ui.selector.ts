import * as fromUi from '../reducsers/ui.reducer';
export const uiSelector = (state: { ui: fromUi.State }) => state.ui.isLoading;
