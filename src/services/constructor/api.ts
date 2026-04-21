import { apiConfig } from '@/utils/apiConfig';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

import type { TIngredient, TOrderStatus } from '@/utils/types';

type TGetIngredientsResponse = {
  succes: boolean;
  data: TIngredient[];
};

type TCreateOrderResponse = {
  succes: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type TOrderByIdResponse = {
  success: boolean;
  order: {
    ingredients: string[];
    _id: string;
    owner: string;
    status: TOrderStatus;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    number: number;
  };
};

export const burgerApi = createApi({
  reducerPath: 'burgerApi',
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
    getIngredients: builder.query<TGetIngredientsResponse, string>({
      query: () => ({
        url: '/ingredients',
      }),
    }),
    getOrderById: builder.query<TOrderByIdResponse, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useGetOrderByIdQuery, useLazyGetOrderByIdQuery } =
  burgerApi;

export const burgerReauthApi = createApi({
  reducerPath: 'burgerReauthApi',
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
    createOrder: builder.mutation<TCreateOrderResponse, { ingredients: string[] }>({
      query: ({ ingredients }) => ({
        url: '/orders',
        method: 'POST',
        body: { ingredients },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = burgerReauthApi;
