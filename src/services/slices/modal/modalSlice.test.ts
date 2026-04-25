import { describe, it, expect } from 'vitest';

import { modalSlice, setIngredientModalState, setOrderModalState } from './modalSlice';

describe('Тест modalSlice', () => {
  const initialState = modalSlice.getInitialState();

  it('Должен вернуть начальное состояние', () => {
    expect(modalSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Должен вызвать setIngredientModalState', () => {
    const actual = modalSlice.reducer(initialState, setIngredientModalState(true));
    expect(actual.igredient.isOpen).toBe(true);

    const actual2 = modalSlice.reducer(actual, setIngredientModalState(false));
    expect(actual2.igredient.isOpen).toBe(false);
  });

  it('Должен вызвать setOrderModalState', () => {
    const actual = modalSlice.reducer(initialState, setOrderModalState(true));
    expect(actual.order.isOpen).toBe(true);

    const actual2 = modalSlice.reducer(actual, setOrderModalState(false));
    expect(actual2.order.isOpen).toBe(false);
  });
});
