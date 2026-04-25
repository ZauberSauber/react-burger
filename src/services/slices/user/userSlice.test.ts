import { describe, it, expect, vi } from 'vitest';

import {
  userSlice,
  setUserState,
  setIsAuthChecked,
  setCacheKey,
  type TUser,
} from './userSlice';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

// Замена localStorage моками
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Моки данных пользователя
const mockUser: TUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
};

describe('Тест userSlice', () => {
  const initialState = userSlice.getInitialState();

  it('Должен вернуть начальное состояние', () => {
    expect(userSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Должен вызвать setUserState', () => {
    const actual = userSlice.reducer(initialState, setUserState(mockUser));
    expect(actual.user).toEqual(mockUser);

    // Test setting user to null
    const actual2 = userSlice.reducer(actual, setUserState(null));
    expect(actual2.user).toBeNull();
  });

  it('Должен вызвать setIsAuthChecked', () => {
    const actual = userSlice.reducer(initialState, setIsAuthChecked(true));
    expect(actual.isAuthChecked).toBe(true);

    const actual2 = userSlice.reducer(actual, setIsAuthChecked(false));
    expect(actual2.isAuthChecked).toBe(false);
  });

  it('Должен вызвать setCacheKey', () => {
    const newKey = 'new-cache-key';
    const actual = userSlice.reducer(initialState, setCacheKey(newKey));

    expect(actual.cacheKey).toBe(newKey);
  });
});
