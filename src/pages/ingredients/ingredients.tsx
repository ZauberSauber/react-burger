import { IngredientDetails } from '@/components/igredient-details/ingredient-details';
import { ModalIngredients } from '@/components/modal-ingrdients/modal-ingrdients';
import { useGetIngredientsQuery } from '@/services/constructor/api';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router-dom';

import type { TIngredient } from '@/utils/types';

import styles from './ingredients.module.css';

const IngredientWrapper = ({
  ingredient,
}: {
  ingredient: TIngredient | null;
}): React.JSX.Element => {
  return (
    <div className={styles.content}>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
};

export const IngredientsPage = (): React.JSX.Element => {
  const { id } = useParams();
  const { isLoading, data } = useGetIngredientsQuery('');

  const location = useLocation();
  const locationState = location.state as { bg: string };

  if (isLoading) {
    return <Preloader />;
  }

  const ingredientId = id ? id.slice(1) : '';
  const ingredient = data?.data.find((item) => item._id === ingredientId) ?? null;

  if (locationState?.bg) {
    return <ModalIngredients ingredient={ingredient} />;
  }

  return <IngredientWrapper ingredient={ingredient} />;
};
