import { useNavigate } from 'react-router-dom';

import { IngredientDetails } from '../igredient-details/ingredient-details';
import { Modal } from '../modal/modal';

import type { TIngredient } from '@/utils/types';

export const ModalIngredients = ({
  ingredient,
}: {
  ingredient: TIngredient | null;
}): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <Modal
      onClose={() => {
        void navigate(-1);
      }}
    >
      <IngredientDetails ingredient={ingredient} titleStyle="modal" />
    </Modal>
  );
};
