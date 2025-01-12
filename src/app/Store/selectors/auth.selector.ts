import { StoreInterface } from '../store';

export const authSelector = (state: StoreInterface) =>
  state.auth.isAuthenticated;
