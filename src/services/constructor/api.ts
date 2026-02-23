import { apiConfig } from '@/utils/apiConfig';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TIngredient } from '@/utils/types';

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
    createOrder: builder.mutation<TCreateOrderResponse, { ingredients: string[] }>({
      query: ({ ingredients }) => ({
        url: '/orders',
        method: 'POST',
        body: { ingredients },
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useCreateOrderMutation } = burgerApi;
