import { Mutex } from 'async-mutex';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const mutex = new Mutex();

export const baseQueryWithReauth = (
  baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  return async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    const refreshToken = localStorage.getItem('refreshToken') ?? '';

    if (result.error && result.error.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshResult = (await baseQuery(
            {
              url: '/auth/token',
              method: 'POST',
              body: { token: refreshToken },
            },
            api,
            extraOptions
          )) as { data: { accessToken: string; refreshToken: string } };

          if (refreshResult?.data) {
            localStorage.setItem('accessToken', refreshResult.data.accessToken);
            localStorage.setItem('refreshToken', refreshResult.data.refreshToken);

            result = await baseQuery(args, api, extraOptions);
          } else {
            baseQuery(
              {
                url: 'auth/logout',
                method: 'POST',
                body: { token: refreshToken },
              },
              api,
              extraOptions
            );
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
      }
    }

    return result;
  };
};
