import { Details } from '@/components/details/details';
import { ModalOrderDetails } from '@/components/modal-order-details/modal-order-details';
import { useLazyGetOrderByIdQuery } from '@/services/constructor/api';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import style from './feed-details.module.css';

export const FeedDetailsPage = (): React.JSX.Element => {
  const location = useLocation();
  const locationState = location.state as { bg: string };
  const { id } = useParams();
  const [getOrder, { data, isLoading }] = useLazyGetOrderByIdQuery();

  useEffect(() => {
    if (!id) {
      return;
    }

    void getOrder(id);
  }, [id]);

  if (locationState?.bg) {
    return <ModalOrderDetails />;
  }

  return (
    <div className={style.page}>
      {isLoading ? (
        <>
          <span className="text text_type_main-large">Загружаем заказ</span>
          <Preloader />
        </>
      ) : (
        <Details
          id={`${data?.order?.number}`}
          status={data?.order?.status ?? 'created'}
          name={data?.order?.name ?? ''}
          date={new Date(data?.order?.createdAt ?? '')}
          ingredientIds={data?.order?.ingredients ?? []}
        />
      )}
    </div>
  );
};
