import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';

import style from './price.module.css';

export const Price = ({
  value = '0',
}: {
  value: string | number;
}): React.JSX.Element => {
  return (
    <span className={clsx(style.price as string, 'text text_type_digits-default')}>
      {value}
      <CurrencyIcon className={style.price_icon as string} type="primary" />
    </span>
  );
};
