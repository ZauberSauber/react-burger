import { authApi } from '@/services/auth/api';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TUser = {
  name: string;
  email: string;
};

const initialState: { user: TUser | null; isAuthChecked: boolean; cacheKey: string } = {
  user: null,
  isAuthChecked: false,
  cacheKey: `${new Date().getTime()}`,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setCacheKey: (state, action: PayloadAction<string>) => {
      state.cacheKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthChecked = true;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    });

    builder.addMatcher(authApi.endpoints.login.matchRejected, () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    });

    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
      state.isAuthChecked = false;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    });

    builder.addMatcher(authApi.endpoints.token.matchFulfilled, (state, action) => {
      state.isAuthChecked = true;

      localStorage.setItem('refreshToken', action.payload.refreshToken);
    });
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getCacheKey: (state) => state.cacheKey,
  },
});

export const { setUserState, setIsAuthChecked, setCacheKey } = userSlice.actions;

export const { getUser, getIsAuthChecked, getCacheKey } = userSlice.selectors;

export default userSlice.reducer;
