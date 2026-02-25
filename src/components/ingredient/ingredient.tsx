import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import { setLastIngredient } from '../slices/burger/burgerSlice';
import { setIngredientModalState } from '../slices/modal/modalSlice';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient.module.css';

type TIngredientProps = {
  ingredient: TIngredient;
  count?: number;
};

export const Ingredient = ({
  ingredient,
  count = 0,
}: TIngredientProps): React.JSX.Element => {
  const dispatch = useDispatch();

  return (
    <div
      className={clsx('pt-2 pb-2', styles.ingredient)}
      onClick={() => {
        dispatch(setLastIngredient(ingredient));
        dispatch(setIngredientModalState(true));
      }}
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
