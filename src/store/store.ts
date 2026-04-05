import { authApi, reauthApi } from '@/services/auth/api';
import { burgerApi } from '@/services/constructor/api';
import { burgerSlice } from '@/services/slices/burger/burgerSlice';
import { modalSlice } from '@/services/slices/modal/modalSlice';
import { userSlice } from '@/services/slices/user/userSlice';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices(
  burgerApi,
  authApi,
  reauthApi,
  burgerSlice,
  modalSlice,
  userSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      burgerApi.middleware,
      authApi.middleware,
      reauthApi.middleware
    );
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
