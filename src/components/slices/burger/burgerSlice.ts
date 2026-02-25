import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type TInitialState = {
  lastIngredient: TIngredient | null;
  recept: {
    bun: TIngredient | null;
    inner: TIngredient[];
  };
};

const initialState: TInitialState = {
  lastIngredient: null,
  recept: {
    bun: null,
    inner: [],
  },
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.recept.bun = action.payload;
    },
    addInner: {
      reducer: (state, action: PayloadAction<TIngredient>) => {
        action.payload.id = nanoid();
        state.recept.inner.unshift(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();

        return {
          payload: {
            ...ingredient,
            id,
          },
        };
      },
    },
    setInnerList: (state, action: PayloadAction<TIngredient[]>) => {
      state.recept.inner = action.payload;
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.recept.inner.splice(action.payload, 1);
    },
    setLastIngredient: (state, action: PayloadAction<TIngredient | null>) => {
      state.lastIngredient = action.payload;
    },
    clearRecept: (state) => {
      state.recept = {
        bun: null,
        inner: [],
      };
    },
  },
  selectors: {
    getRecept: (state) => state.recept,
    getLastIngredient: (state) => state.lastIngredient,
  },
});

export const {
  addBun,
  addInner,
  removeIngredient,
  setInnerList,
  setLastIngredient,
  clearRecept,
} = burgerSlice.actions;

export const {
  selectors: { getRecept, getLastIngredient },
} = burgerSlice;

export default burgerSlice.reducer;
