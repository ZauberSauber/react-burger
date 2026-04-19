import { useLazyGetOrderByIdQuery } from '@/services/constructor/api';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Details } from '../details/details';
import { Modal } from '../modal/modal';

export const ModalOrderDetails = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [getOrder, { data, isLoading }] = useLazyGetOrderByIdQuery();

  useEffect(() => {
    if (!id) {
      return;
    }

    void getOrder(id);
  }, [id]);

  return (
    <Modal
      onClose={() => {
        void navigate(-1);
      }}
    >
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
    </Modal>
  );
};
