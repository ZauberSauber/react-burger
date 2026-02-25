import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { IngredientDetails } from '../igredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
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
          <IngredientDetails />
        </Modal>
      )}
      {orderModal.isOpen && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
