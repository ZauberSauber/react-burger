import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient.module.css';

type TIngredientProps = {
  ingredient: TIngredient;
  count?: number;
  onClick: (id: string) => void;
};

export const Ingredient = ({
  ingredient,
  count = 0,
  onClick,
}: TIngredientProps): React.JSX.Element => {
  return (
    <div
      className={clsx('pt-2 pb-2', styles.ingredient)}
      onClick={() => onClick(ingredient._id)}
    >
      {count > 0 && <Counter count={count} size="default" />}

      <img src={ingredient.image} alt={ingredient.name} />
      <span className={clsx('pb-2', styles.price)}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </span>
      <span>{ingredient.name}</span>
    </div>
  );
};
