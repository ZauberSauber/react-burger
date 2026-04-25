import { useAppDispatch } from '@/utils/hooks';
import { PATHS } from '@/utils/paths';
import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';

import { setLastIngredient } from '../../services/slices/burger/burgerSlice';

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={clsx('pt-2 pb-2', styles.ingredient)}
      onClick={() => {
        void navigate(`${PATHS.INGREDIENTS}/:${ingredient._id}`, {
          state: { bg: location },
        });
        dispatch(setLastIngredient(ingredient));
      }}
    >
      {count > 0 && <Counter count={count} size="default" />}

      <img src={ingredient.image} alt={ingredient.name} />
      <span className={clsx('pb-2', styles.price)}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </span>
      <span className={`test-ingredient-name-${ingredient.type}`}>
        {ingredient.name}
      </span>
    </div>
  );
};
