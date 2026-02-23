import { useCreateOrderMutation } from '@/services/constructor/api';
import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';

import styles from './order-modal.module.css';

export const OrderModal = (): React.JSX.Element => {
  const [, { data }] = useCreateOrderMutation({
    fixedCacheKey: 'from-constructor',
  });

  return (
    <>
      <h3 className={clsx(styles.order_id, 'text text_type_digits-large mt-15')}>
        {data?.order?.number}
      </h3>
      <span className="text text_type_main-medium mt-8">идентификатор заказа</span>
      <span className={clsx(styles.icon_wrapper, 'mt-15')}>
        <CheckMarkIcon className={styles.check_icon} type="primary" />
      </span>
      <span className="text text_type_main-small mt-15">{`Ваш заказ "${data?.name}" начали готовить`}</span>
      <span className="text text_type_main-small text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </span>
    </>
  );
};
