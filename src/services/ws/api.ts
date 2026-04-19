import { apiConfig } from '@/utils/apiConfig';
import { getAccessToken } from '@/utils/getAccesToken';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { authApi } from '../auth/api';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

import type { TOrderStatus } from '@/utils/types';

let socket: WebSocket;

export type TResposeOrder = {
  _id: string;
  ingredients: string[];
  status: TOrderStatus;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  number: 637;
};

export type TGetOrdersResponse = {
  orders: TResposeOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};

export const wsApi = createApi({
  reducerPath: 'wsApi',
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
    getOrders: builder.query<TGetOrdersResponse, { withToken?: boolean }>({
      query: ({ withToken }) => {
        const accessToken = getAccessToken();

        return withToken ? `orders?token=${accessToken}` : 'orders/all';
      },
      async onCacheEntryAdded(args, api) {
        const RECONNECT_PERIOD = 3000;
        let reconnectTimerId: ReturnType<typeof setTimeout> | undefined;
        let isUnsubscribed = false;

        const connect = (): void => {
          if (reconnectTimerId) {
            clearTimeout(reconnectTimerId);
            reconnectTimerId = undefined;
          }

          const accessToken = getAccessToken();

          if (args.withToken) {
            socket = new WebSocket(`${apiConfig.wsUrl}/orders?token=${accessToken}`);
          } else {
            socket = new WebSocket(`${apiConfig.wsUrl}/orders/all`);
          }

          socket.addEventListener('message', (event: MessageEvent<string>): void => {
            const data = JSON.parse(event.data) as TGetOrdersResponse & {
              message: string;
            };

            if (data.message === 'Invalid or missing token') {
              const refreshToken = localStorage.getItem('refreshToken') ?? '';

              void api
                .dispatch(authApi.endpoints.token.initiate({ token: refreshToken }))
                .then((data) => {
                  if (data.isSuccess) {
                    localStorage.setItem('accessToken', data?.data.accessToken);
                    localStorage.setItem('refreshToken', data?.data.refreshToken);

                    socket.close();

                    connect();
                  } else {
                    console.error('Не удалось обновить токен', data?.error);
                    isUnsubscribed = true;
                  }
                });

              return;
            }

            api.updateCachedData((draft) => {
              Object.assign(draft, data);
            });
          });

          socket.addEventListener('close', () => {
            if (!isUnsubscribed) {
              reconnectTimerId = setTimeout(connect, RECONNECT_PERIOD);
            }
          });

          socket.addEventListener('error', (error) => {
            console.error('Ошибка WebSocket:', error);
          });
        };

        try {
          await api.cacheDataLoaded;
          connect();
        } catch (error) {
          console.error('WebSocket, соединение, ошибка:', error);
        }

        await api.cacheEntryRemoved;
        isUnsubscribed = true;
        clearTimeout(reconnectTimerId);
        socket.close();
      },
    }),
    sendMessage: builder.mutation({
      // queryFn позволяет обойти стандартный HTTP-запрос и выполнить произвольный код
      queryFn: (messageContent: string) => {
        // Проверяем, что сокет существует и открыт
        if (socket && socket.readyState === WebSocket.OPEN) {
          const message = { text: messageContent, id: Date.now() };

          // Отправляем данные в сокет
          socket.send(JSON.stringify(message));

          // Возвращаем результат, как будто сервер ответил успешно
          return { data: message };
        }

        return { error: { status: 500, data: 'WebSocket is not connected' } };
      },
    }),
  }),
});

export const { useGetOrdersQuery, useLazyGetOrdersQuery } = wsApi;

export const wsReauthApi = createApi({
  reducerPath: 'wsReauthApi',
  baseQuery: baseQueryWithReauth(fetchBaseQuery({ baseUrl: apiConfig.baseUrl })),
  endpoints: (builder) => ({
    getTokenOrders: builder.query<TGetOrdersResponse, number>({
      query: () => 'orders/all',
      async onCacheEntryAdded(_, api) {
        const RECONNECT_PERIOD = 3000;
        let reconnectTimerId: ReturnType<typeof setTimeout> | undefined;
        let isUnsubscribed = false;

        const connect = (): void => {
          if (reconnectTimerId) {
            clearTimeout(reconnectTimerId);
            reconnectTimerId = undefined;
          }

          const accessToken = localStorage.getItem('accessToken');
          socket = new WebSocket(`${apiConfig.wsUrl}/orders?token=${accessToken}`);

          socket.addEventListener('message', (event: MessageEvent<string>): void => {
            const data = JSON.parse(event.data) as TGetOrdersResponse;

            api.updateCachedData((draft) => {
              Object.assign(draft, data);
            });
          });

          socket.addEventListener('close', () => {
            if (!isUnsubscribed) {
              reconnectTimerId = setTimeout(connect, RECONNECT_PERIOD);
            }
          });

          socket.addEventListener('error', (error) => {
            console.error('Ошибка WebSocket:', error);
          });
        };

        try {
          await api.cacheDataLoaded;
          connect();
        } catch (error) {
          console.error('WebSocket, соединение, ошибка:', error);
        }

        await api.cacheEntryRemoved;
        isUnsubscribed = true;
        clearTimeout(reconnectTimerId);
        socket.close();
      },
    }),
  }),
});

// export const {  } = wsReauthApi;
