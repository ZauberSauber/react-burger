import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';

import { ScrollWrapper } from '../scroll-wrapper/scroll-wrapper';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
  receptPrice: number;
  deleteIngredient: (index: number) => void;
  openOrderModal: () => void;
};

export const BurgerConstructor = ({
  ingredients,
  receptPrice,
  deleteIngredient,
  openOrderModal,
}: TBurgerConstructorProps): React.JSX.Element => {
  const burgerBuns: React.ReactNode[] = [];
  const burgerInner: React.ReactNode[] = [];

  ingredients.forEach((ingredient, index) => {
    let type: 'bottom' | 'top' | undefined = undefined;
    let isBun = false;
    let bunPosition = '';

    if (ingredient.type === 'bun') {
      isBun = true;

      if (index === 0) {
        type = 'top';
        bunPosition = ' (верх)';
      } else {
        type = 'bottom';
        bunPosition = ' (низ)';
      }

      burgerBuns.push(
        <div
          className={clsx(
            styles.ingredient_wrapper as string,
            styles.ingredient__bun as string
          )}
          key={ingredient._id + index.toString()}
        >
          <ConstructorElement
            extraClass={styles.ingredient as string}
            price={ingredient.price}
            text={ingredient.name + bunPosition}
            thumbnail={ingredient.image}
            type={type}
            isLocked={isBun}
          />
        </div>
      );
    } else {
      burgerInner.push(
        <div
          className={styles.ingredient_wrapper as string}
          key={ingredient._id + index.toString()}
        >
          <DragIcon className={styles.drag_icon as string} type="primary" />

          <ConstructorElement
            extraClass={styles.ingredient as string}
            handleClose={() => deleteIngredient(index)}
            price={ingredient.price}
            text={ingredient.name}
            thumbnail={ingredient.image}
          />
        </div>
      );
    }
  });

  const burger: React.ReactNode[] = [
    <ScrollWrapper key="burger-scroll" className={styles.burger_scroll as string}>
      {burgerInner}
    </ScrollWrapper>,
  ];

  if (burgerBuns.length) {
    burger.unshift(burgerBuns[0]);
    burger.push(burgerBuns[1]);
  }

  return (
    <section className={styles.burger_constructor}>
      {burger}

      {receptPrice > 0 ? (
        <div className={styles.price_block as string}>
          <span className={clsx(styles.price as string, 'text text_type_main-large')}>
            {receptPrice}
            <CurrencyIcon className={styles.price_icon as string} type="primary" />
          </span>

          <Button
            size="medium"
            type="primary"
            htmlType="button"
            onClick={openOrderModal}
          >
            Оформить заказ
          </Button>
        </div>
      ) : null}
    </section>
  );
};
