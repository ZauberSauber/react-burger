import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  igredient: {
    isOpen: false,
  },
  order: {
    isOpen: false,
  },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIngredientModalState: (state, action: PayloadAction<boolean>) => {
      state.igredient.isOpen = action.payload;
    },
    setOrderModalState: (state, action: PayloadAction<boolean>) => {
      state.order.isOpen = action.payload;
    },
  },
  selectors: {
    getIngredientModalState: (state) => state.igredient,
    getOrderModalState: (state) => state.order,
  },
});

export const { setIngredientModalState, setOrderModalState } = modalSlice.actions;

export const { getIngredientModalState, getOrderModalState } = modalSlice.selectors;

export default modalSlice.reducer;
