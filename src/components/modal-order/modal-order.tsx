import { useAppDispatch, useAppSelector } from '@/utils/hooks';

import {
  getOrderModalState,
  setOrderModalState,
} from '../../services/slices/modal/modalSlice';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

export const ModalOrder = (): React.JSX.Element | null => {
  const modalState = useAppSelector(getOrderModalState);
  const dispatch = useAppDispatch();

  if (!modalState.isOpen) {
    return null;
  }

  return (
    <Modal
      onClose={() => {
        dispatch(setOrderModalState(false));
      }}
    >
      <OrderDetails />
    </Modal>
  );
};
