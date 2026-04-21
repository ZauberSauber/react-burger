import { authApi, reauthApi } from '@/services/auth/api';
import { burgerApi, burgerReauthApi } from '@/services/constructor/api';
import { burgerSlice } from '@/services/slices/burger/burgerSlice';
import { modalSlice } from '@/services/slices/modal/modalSlice';
import { userSlice } from '@/services/slices/user/userSlice';
import { wsApi } from '@/services/ws/api';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices(
  burgerApi,
  burgerReauthApi,
  authApi,
  reauthApi,
  wsApi,
  burgerSlice,
  modalSlice,
  userSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      burgerApi.middleware,
      burgerReauthApi.middleware,
      authApi.middleware,
      reauthApi.middleware,
      wsApi.middleware
    );
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
