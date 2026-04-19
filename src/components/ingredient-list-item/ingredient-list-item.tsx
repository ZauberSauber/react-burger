import { OrderIngredient } from '../order-ingredient/order-ingredient';
import { Price } from '../price/price';

import style from './ingredient-list-item.module.css';

type TProps = {
  url: string;
  name: string;
  price: string;
};

export const IngredientListItem = ({ name, price, url }: TProps): React.JSX.Element => {
  return (
    <div className={style.content}>
      <OrderIngredient url={url} />
      <div className={'text text_type_main-default'}>{name}</div>
      <Price value={price} />
    </div>
  );
};
