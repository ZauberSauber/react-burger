import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { IngredientModal } from '../igredient-modal/ingredient-modal';
import { Modal } from '../modal/modal';
import { OrderModal } from '../order-modal/order-modal';
import {
  getIngredientModalState,
  getOrderModalState,
  setIngredientModalState,
  setOrderModalState,
} from '../slices/modal/modalSlice';

export const ConstructorController = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const ingredientModal = useSelector(getIngredientModalState);
  const orderModal = useSelector(getOrderModalState);

  const handleCloseIgredientModal = (): void => {
    dispatch(setIngredientModalState(false));
  };

  const handleCloseOrderModal = (): void => {
    dispatch(setOrderModalState(false));
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>

      {ingredientModal.isOpen && (
        <Modal onClose={handleCloseIgredientModal}>
          <IngredientModal />
        </Modal>
      )}
      {orderModal.isOpen && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderModal />
        </Modal>
      )}
    </>
  );
};
