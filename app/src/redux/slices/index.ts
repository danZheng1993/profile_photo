import { profilesSlice, getProfiles } from './profiles';

export const reducers = {
  profileReducer: profilesSlice.reducer,
};

export const actions = {
  getProfiles
};
