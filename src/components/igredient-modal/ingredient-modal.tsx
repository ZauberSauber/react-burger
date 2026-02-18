import clsx from 'clsx';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-modal.module.css';

type TIngredientModalProps = {
  ingredient: TIngredient;
};

export const IngredientModal = ({
  ingredient,
}: TIngredientModalProps): React.JSX.Element => {
  return (
    <>
      <h3 className={clsx(styles.title as string, 'text text_type_main-large')}>
        Детали ингредиента
      </h3>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <span className="text text_type_main-medium mt-4">{ingredient.name}</span>
      <div className={clsx(styles.info as string, 'mt-8')}>
        <div className={styles.info_item as string}>
          <span className="text text_type_main-default">Калории,ккал</span>
          <span className="text text_type_main-medium">{ingredient.calories}</span>
        </div>
        <div className={styles.info_item as string}>
          <span className="text text_type_main-default">Белки, г</span>
          <span className="text text_type_main-medium">{ingredient.proteins}</span>
        </div>
        <div className={styles.info_item as string}>
          <span className="text text_type_main-default">Жиры, г</span>
          <span className="text text_type_main-medium">{ingredient.fat}</span>
        </div>
        <div className={styles.info_item as string}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span className="text text_type_main-medium">{ingredient.carbohydrates}</span>
        </div>
      </div>
    </>
  );
};
