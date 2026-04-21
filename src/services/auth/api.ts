import { apiConfig } from '@/utils/apiConfig';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

type TBaseResponse = {
  success: boolean;
  message: string;
};

type TUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

type TUserRefrreshResponse = TUserResponse;

type TUserRefrreshBody = {
  name: string;
  email: string;
  password: string;
};

type TRegisterResponse = TUserResponse & {
  accessToken: string;
  refreshToken: string;
};

type TRegisterBody = { email: string; password: string; name: string };

type TLoginResponse = TUserResponse & {
  accessToken: string;
  refreshToken: string;
};

type TLoginBody = { email: string; password: string };

type TTokenResponse = TBaseResponse & {
  accessToken: string;
  refreshToken: string;
};

type TTokenBody = {
  token: string;
};

type TLogoutResponse = TBaseResponse;

type TLogoutBody = {
  token: string;
};

type TpasswordRecoverResponse = TBaseResponse;

type TpasswordRecoverBody = {
  email: string;
};

type TpasswordResetResponse = TBaseResponse;

type TpasswordResetBody = {
  password: string;
  token: string;
};

export const reauthApi = createApi({
  reducerPath: 'reauthApi',
  baseQuery: baseQueryWithReauth(
    fetchBaseQuery({
      baseUrl: apiConfig.baseUrl,
      prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
          headers.set('Authorization', accessToken);
        }

        headers.set('Content-Type', 'application/json');

        return headers;
      },
    })
  ),
  endpoints: (builder) => ({
    user: builder.query<TUserResponse, unknown>({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
        cache: 'no-cache',
      }),
    }),
    changeUser: builder.query<TUserRefrreshResponse, TUserRefrreshBody>({
      query: (body) => ({
        url: '/auth/user',
        method: 'PATCH',
        body,
      }),
    }),
    passwordRecover: builder.query<TpasswordRecoverResponse, TpasswordRecoverBody>({
      query: (body) => ({
        url: '/password-reset',
        method: 'POST',
        body,
      }),
    }),
    passwordReset: builder.mutation<TpasswordResetResponse, TpasswordResetBody>({
      query: (body) => ({
        url: '/password-reset/reset',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.baseUrl,
    prepareHeaders: (headers) => {
      for (const [key, value] of Object.entries(apiConfig.headers)) {
        headers.set(key, value);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.query<TRegisterResponse, TRegisterBody>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.query<TLoginResponse, TLoginBody>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    token: builder.query<TTokenResponse, TTokenBody>({
      query: (body) => ({
        url: '/auth/token',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.query<TLogoutResponse, TLogoutBody>({
      query: (body) => ({
        url: '/auth/logout',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginQuery,
  useLazyLoginQuery,
  useRegisterQuery,
  useLazyRegisterQuery,
  useTokenQuery,
  useLogoutQuery,
  useLazyLogoutQuery,
} = authApi;

export const {
  useUserQuery,
  useLazyUserQuery,
  useChangeUserQuery,
  useLazyChangeUserQuery,
  usePasswordRecoverQuery,
  useLazyPasswordRecoverQuery,
  usePasswordResetMutation,
} = reauthApi;
