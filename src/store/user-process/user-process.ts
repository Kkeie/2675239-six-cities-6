import { createReducer } from '@reduxjs/toolkit';
import {requireAuthorizationAction, setUserAction, loginAction, checkAuthAction, logoutAction} from '../action.ts';
import {AuthorizationStatus} from '../../const.ts';
import {AuthInfo} from '../../types/auth.ts';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorizationAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserAction, (state, action) => {
      state.user = action.payload;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logoutAction, (state) => {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

