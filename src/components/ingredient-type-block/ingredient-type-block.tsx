import { useAppSelector } from '@/utils/hooks';

import { getRecept } from '../../services/slices/burger/burgerSlice';
import { DragElement } from '../drag-element/drag-element';
import { Ingredient } from '../ingredient/ingredient';
import { BLOCK_NAMES } from './constants';

import type { TIngredient, TIngredientType } from '@/utils/types';

import styles from './ingredient-type-block.module.css';

type TIngredientTypeBlockProps = {
  type: TIngredientType;
  ingredients: TIngredient[];
  ref: React.Ref<HTMLElement>;
};

export const IngredientTypeBlock = ({
  type,
  ingredients,
  ref,
}: TIngredientTypeBlockProps): React.JSX.Element => {
  const recept = useAppSelector(getRecept);

  return (
    <section className="pl-4 pr-4 mt-10" ref={ref}>
      <p className="pb-6 text text_type_main-medium">{BLOCK_NAMES[type]}</p>
      <div className={styles.ingredients_container as string}>
        {ingredients.map((ingredient) => {
          let count = 0;

          if (type === 'bun') {
            if (ingredient._id === recept.bun?._id) {
              count = 2;
            }
          } else {
            recept.inner.forEach((item) => {
              if (item._id === ingredient._id) {
                count++;
              }
            });
          }

          return (
            <DragElement
              key={ingredient._id}
              data={{ ...ingredient, id: ingredient._id }}
            >
              <Ingredient ingredient={ingredient} count={count} />
            </DragElement>
          );
        })}
      </div>
    </section>
  );
};
