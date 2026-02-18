import { Tab } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useState } from 'react';

import { IngredientTypeBlock } from '../ingredient-type-block/ingredient-type-block';
import { TAB_NAMES } from './constants';

import type { TIngredient, TIngredientType } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
  addIngredient: (id: string) => void;
};

export const BurgerIngredients = ({
  ingredients,
  addIngredient,
}: TBurgerIngredientsProps): React.JSX.Element => {
  console.log(ingredients);
  const [activeTab, setActibeTab] = useState<TIngredientType>('bun');

  const isActive = (tabName: TIngredientType): boolean => tabName === activeTab;

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value={TAB_NAMES.bun}
            active={isActive(TAB_NAMES.bun)}
            onClick={() => {
              setActibeTab(TAB_NAMES.bun);
            }}
          >
            Булки
          </Tab>
          <Tab
            value={TAB_NAMES.main}
            active={isActive(TAB_NAMES.main)}
            onClick={() => {
              setActibeTab(TAB_NAMES.main);
            }}
          >
            Начинки
          </Tab>
          <Tab
            value={TAB_NAMES.sauce}
            active={isActive(TAB_NAMES.sauce)}
            onClick={() => {
              setActibeTab(TAB_NAMES.sauce);
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <section className={clsx('custom-scroll', styles.ingredients_container)}>
        {Object.keys(TAB_NAMES).map((tabName) => (
          <IngredientTypeBlock
            key={tabName}
            type={tabName as TIngredientType}
            ingredients={ingredients.filter((ingredient) => ingredient.type === tabName)}
            onClick={addIngredient}
          />
        ))}
      </section>
    </section>
  );
};
