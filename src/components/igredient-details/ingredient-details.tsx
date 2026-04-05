import clsx from 'clsx';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-details.module.css';

export const IngredientDetails = ({
  ingredient,
  titleStyle = 'page',
}: {
  ingredient: TIngredient | null;
  titleStyle?: 'page' | 'modal';
}): React.JSX.Element => {
  return ingredient ? (
    <>
      <h3
        className={clsx(
          titleStyle === 'modal' ? (styles.title as string) : '',
          'text text_type_main-large'
        )}
      >
        Детали ингредиента
      </h3>
      <img
        className={styles.img as string}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
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
  ) : (
    <h3 className={clsx(styles.title as string, 'text text_type_main-large')}>
      Ингредиент не выбран
    </h3>
  );
};
