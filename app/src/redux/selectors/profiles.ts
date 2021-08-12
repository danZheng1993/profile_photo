import { RootState } from '../store';

export const selectProfiles = (state: RootState) => state.profileReducer.profiles;

export const selectProfile = (profileId: number) => (state: RootState) =>
  state.profileReducer.profiles.find(profile => profile.id === profileId);
