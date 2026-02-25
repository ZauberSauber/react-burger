import { burgerSlice } from '@/components/slices/burger/burgerSlice';
import { modalSlice } from '@/components/slices/modal/modalSlice';
import { burgerApi } from '@/services/constructor/api';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices(burgerApi, burgerSlice, modalSlice);

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(burgerApi.middleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
