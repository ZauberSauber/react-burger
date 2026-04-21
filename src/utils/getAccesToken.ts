export const getAccessToken = (): string =>
  (localStorage.getItem('accessToken') ?? '').replace(/^Bearer\s+/i, '');
