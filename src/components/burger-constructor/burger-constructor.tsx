import { useCreateOrderMutation } from '@/services/constructor/api';
import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { DragSortElement } from '../drag-sort-element/drag-sort-element';
import { DropTarget } from '../drop-target/drop-target';
import { EmptyConstructorElement } from '../empty-constructor-element/empty-constructor-element';
import { ScrollWrapper } from '../scroll-wrapper/scroll-wrapper';
import {
  addBun,
  addInner,
  getRecept,
  removeIngredient,
  setInnerList,
  setLastIngredient,
} from '../slices/burger/burgerSlice';
import { setIngredientModalState, setOrderModalState } from '../slices/modal/modalSlice';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const [createOrderMutation, { isLoading: isCreatingOrder }] = useCreateOrderMutation({
    fixedCacheKey: 'from-constructor',
  });

  const recept = useSelector(getRecept);

  const handleDropIngredient = (item: TIngredient): void => {
    if (item.type === 'bun') {
      dispatch(addBun(item));
    } else {
      dispatch(addInner(item));
    }

    dispatch(setLastIngredient(item));
    dispatch(setIngredientModalState(true));
  };

  const deleteIngredient = (index: number): void => {
    dispatch(removeIngredient(index));
  };

  const createOrder = async (): Promise<void> => {
    let ids = recept.inner.map((item) => item._id);

    if (recept.bun) {
      ids = [recept.bun._id, ...ids, recept.bun._id];
    }

    await createOrderMutation({ ingredients: ids })
      .unwrap()
      .then(() => {
        dispatch(setOrderModalState(true));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = recept.inner.findIndex((item) => item.id === active.id);
      const newIndex = recept.inner.findIndex((item) => item.id === over.id);

      const newList = arrayMove(recept.inner, oldIndex, newIndex);

      dispatch(setInnerList(newList));
    }
  };

  return (
    <section className={styles.burger_constructor}>
      <DropTarget
        className={clsx(
          styles.ingredient_wrapper as string,
          styles.ingredient__bun as string
        )}
        accept={'bun'}
        onDrop={handleDropIngredient}
      >
        {recept.bun ? (
          <ConstructorElement
            extraClass={styles.ingredient as string}
            price={recept.bun.price}
            text={recept.bun.name + ' (верх)'}
            thumbnail={recept.bun.image}
            type={'top'}
            isLocked
          />
        ) : (
          <EmptyConstructorElement type={'top'} text={'Выберите булки'} />
        )}
      </DropTarget>

      <ScrollWrapper className={styles.burger_scroll as string}>
        <DropTarget
          className={styles.drop_ingedient as string}
          accept={['main', 'sauce']}
          onDrop={handleDropIngredient}
        >
          {recept.inner.length > 0 ? (
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={recept.inner}
                strategy={verticalListSortingStrategy}
              >
                {recept.inner.map((inner: TIngredient, index) => {
                  return (
                    <DragSortElement key={inner.id} data={inner}>
                      <div className={styles.ingredient_wrapper as string}>
                        <DragIcon
                          className={styles.drag_icon as string}
                          type="primary"
                        />

                        <ConstructorElement
                          extraClass={styles.ingredient as string}
                          handleClose={() => deleteIngredient(index)}
                          price={inner.price}
                          text={inner.name}
                          thumbnail={inner.image}
                        />
                      </div>
                    </DragSortElement>
                  );
                })}
              </SortableContext>
            </DndContext>
          ) : (
            <div className={styles.ingredient_wrapper as string}>
              <EmptyConstructorElement
                className={styles.empty_ingredient as string}
                text={'Выберите начинку'}
              />
            </div>
          )}
        </DropTarget>
      </ScrollWrapper>

      <DropTarget
        className={clsx(
          styles.ingredient_wrapper as string,
          styles.ingredient__bun as string
        )}
        accept={'bun'}
        onDrop={handleDropIngredient}
      >
        {recept.bun ? (
          <ConstructorElement
            extraClass={styles.ingredient as string}
            price={recept.bun.price}
            text={recept.bun.name + ' (низ)'}
            thumbnail={recept.bun.image}
            type={'bottom'}
            isLocked
          />
        ) : (
          <EmptyConstructorElement type={'bottom'} text={'Выберите булки'} />
        )}
      </DropTarget>

      <div className={styles.price_block as string}>
        <span className={clsx(styles.price as string, 'text text_type_main-large')}>
          {recept.inner.reduce((acc: number, item: TIngredient) => acc + item.price, 0) +
            (recept.bun?.price ?? 0) * 2}
          <CurrencyIcon className={styles.price_icon as string} type="primary" />
        </span>

        <Button
          size="medium"
          type="primary"
          htmlType="button"
          disabled={!recept.bun || !recept.inner.length || isCreatingOrder}
          onClick={() => void createOrder()}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
