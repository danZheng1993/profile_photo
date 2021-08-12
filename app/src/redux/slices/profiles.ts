/* eslint no-param-reassign: 0 */
import { createAsyncThunk, createSlice, isPending, isFulfilled, isRejected, createAction } from '@reduxjs/toolkit';

import { apiClient } from '../../api';

import { Profile } from '../../models/Profile';

const name = 'profiles';

type ProfilesState = {
  profiles: Profile[];
};

const initialState: ProfilesState = { profiles: [] };

export const getProfiles = createAsyncThunk(
  `${name}/profiles`,
  async () => {
    return await apiClient.get('/member');
  },
);

export const profilesSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfiles.fulfilled, (state, action) => {
        return ({
          ...state,
          profiles: action.payload?.data as Profile[],
        })
      })
  },
});
