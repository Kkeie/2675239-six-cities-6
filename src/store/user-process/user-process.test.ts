import { describe, it, expect } from 'vitest';
import { userProcess } from './user-process';
import {
  requireAuthorizationAction,
  setUserAction,
  checkAuthAction,
  loginAction,
  logoutAction,
} from '../action';
import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/auth';

describe('userProcess reducer', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
  };

  const mockUser: AuthInfo = {
    email: 'test@test.com',
    token: 'test-token',
  };

  it('should return initial state', () => {
    expect(userProcess(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle requireAuthorizationAction', () => {
    const action = requireAuthorizationAction(AuthorizationStatus.Auth);
    const result = userProcess(initialState, action);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should handle setUserAction', () => {
    const action = setUserAction(mockUser);
    const result = userProcess(initialState, action);

    expect(result.user).toEqual(mockUser);
  });

  it('should handle setUserAction with null', () => {
    const state = { ...initialState, user: mockUser };
    const action = setUserAction(null);
    const result = userProcess(state, action);

    expect(result.user).toBeNull();
  });

  it('should handle checkAuthAction.fulfilled', () => {
    const action = {
      type: checkAuthAction.fulfilled.type,
      payload: mockUser,
    };
    const result = userProcess(initialState, action);

    expect(result.user).toEqual(mockUser);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should handle checkAuthAction.rejected', () => {
    const state = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.Unknown,
    };
    const action = { type: checkAuthAction.rejected.type };
    const result = userProcess(state, action);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should handle loginAction.fulfilled', () => {
    const action = {
      type: loginAction.fulfilled.type,
      payload: mockUser,
    };
    const result = userProcess(initialState, action);

    expect(result.user).toEqual(mockUser);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should handle loginAction.rejected', () => {
    const state = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.Unknown,
    };
    const action = { type: loginAction.rejected.type };
    const result = userProcess(state, action);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should handle logoutAction', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: mockUser,
    };
    const action = logoutAction();
    const result = userProcess(state, action);

    expect(result.user).toBeNull();
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });
});

