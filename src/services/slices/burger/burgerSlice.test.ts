import { describe, it, expect } from 'vitest';

import {
  burgerSlice,
  addBun,
  addInner,
  removeIngredient,
  setInnerList,
  setLastIngredient,
  clearRecept,
} from './burgerSlice';

import type { TIngredient } from '@/utils/types';

const mockBun: TIngredient = {
  _id: 'bun-1',
  __v: 0,
  id: 'bun-1',
  name: 'Супер булка',
  type: 'bun',
  proteins: 10,
  fat: 15,
  carbohydrates: 30,
  calories: 200,
  price: 50,
  image: 'bun-image.png',
  image_mobile: 'bun-image-mobile.png',
  image_large: 'bun-image-large.png',
};

const mockIngredient: TIngredient = {
  _id: 'ing-1',
  __v: 1,
  id: 'ing-1',
  name: 'Сочная котлета',
  type: 'main',
  proteins: 20,
  fat: 18,
  carbohydrates: 2,
  calories: 250,
  price: 100,
  image: 'patty-image.png',
  image_mobile: 'patty-image-mobile.png',
  image_large: 'patty-image-large.png',
};

describe('Тест burgerSlice', () => {
  const initialState = burgerSlice.getInitialState();

  it('Должен вернуть начальное состояние', () => {
    expect(burgerSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Должен вызвать addBun', () => {
    const actual = burgerSlice.reducer(initialState, addBun(mockBun));
    expect(actual.recept.bun).toEqual(mockBun);
  });

  it('Должен вызвать addInner', () => {
    const actual = burgerSlice.reducer(initialState, addInner(mockIngredient));
    expect(actual.recept.inner).toHaveLength(1);
    expect(actual.recept.inner[0].id).toBeDefined();
  });

  it('Должен вызвать setInnerList', () => {
    const ingredients = [mockIngredient, { ...mockIngredient, _id: 'ing-2' }];
    const actual = burgerSlice.reducer(initialState, setInnerList(ingredients));
    expect(actual.recept.inner).toEqual(ingredients);
  });

  it('Должен вызвать removeIngredient', () => {
    // First add an ingredient
    let state = burgerSlice.reducer(initialState, addInner(mockIngredient));
    expect(state.recept.inner).toHaveLength(1);

    // Then remove it
    state = burgerSlice.reducer(state, removeIngredient(0));
    expect(state.recept.inner).toHaveLength(0);
  });

  it('Должен вызвать setLastIngredient', () => {
    const actual = burgerSlice.reducer(initialState, setLastIngredient(mockIngredient));
    expect(actual.lastIngredient).toEqual(mockIngredient);
  });

  it('Должен вызвать clearRecept', () => {
    // First add some ingredients
    let state = burgerSlice.reducer(initialState, addBun(mockBun));
    state = burgerSlice.reducer(state, addInner(mockIngredient));

    // Then clear the recept
    state = burgerSlice.reducer(state, clearRecept());
    expect(state.recept.bun).toBeNull();
    expect(state.recept.inner).toHaveLength(0);
  });
});
