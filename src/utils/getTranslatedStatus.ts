import type { TResposeOrder } from '@/services/ws/api';

const statusMap: Record<TResposeOrder['status'], string> = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
};

export const getTranslatedStatus = (status: TResposeOrder['status']): string => {
  const translatedStatus = statusMap[status];

  return translatedStatus ?? status;
};
