import { Ingredient } from '../ingredient/ingredient';
import { BLOCK_NAMES } from './constants';

import type { TIngredient, TIngredientType } from '@/utils/types';

import styles from './ingredient-type-block.module.css';

type TIngredientTypeBlockProps = {
  type: TIngredientType;
  ingredients: TIngredient[];
  onClick: (id: string) => void;
};

export const IngredientTypeBlock = ({
  type,
  ingredients,
  onClick,
}: TIngredientTypeBlockProps): React.JSX.Element => {
  return (
    <section className="pl-4 pr-4 mt-10">
      <p className="pb-6 text text_type_main-medium">{BLOCK_NAMES[type]}</p>
      <div className={styles.ingredients_container as string}>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            ingredient={ingredient}
            count={ingredient.count}
            onClick={onClick}
          />
        ))}
      </div>
    </section>
  );
};
