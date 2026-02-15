import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { IngredientModal } from '../igredient-modal/ingredient-modal';
import { Modal } from '../modal/modal';
import { OrderModal } from '../order-modal/order-modal';

import type { TIngredient } from '@/utils/types';

export const ConstructorController = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [recept, setRecept] = useState<TIngredient[]>([]);
  const [receptPrice, setReceptPrice] = useState(0);
  const [currentIngredient, setCurrentIngredient] = useState<TIngredient | null>(null);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      const response = await fetch(
        'https://new-stellarburgers.education-services.ru/api/ingredients',
        {
          signal,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = (await response.json()) as {
        success: boolean;
        data: TIngredient[];
      };

      setIngredients(result?.data || []);
    };

    fetchData()
      .catch((err) => {
        if (err instanceof Error) {
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return (): void => {
      abortController.abort();
    };
  }, []);

  const handleCloseIgredientModal = (): void => {
    setIsIngredientModalOpen(false);
  };

  const handleOpenOrderModal = (): void => {
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = (): void => {
    setIsOrderModalOpen(false);
  };

  const countReceptPrice = (recept: TIngredient[]): void => {
    let price = 0;

    recept.forEach((ingredient) => {
      price += ingredient.price;
    });

    setReceptPrice(price);
  };

  const addIngredient = (id: string): void => {
    const newIngredient = ingredients.find((ingredient) => ingredient._id === id);

    if (!newIngredient) {
      return;
    }

    if (newIngredient.type === 'bun') {
      ingredients.forEach((ingredient) => {
        if (ingredient.type === 'bun') {
          ingredient.count = 0;
        }
      });
    }

    newIngredient.count = (newIngredient.count || 0) + 1;

    setRecept((oldRecept) => {
      let newRecept = [...oldRecept];

      if (newRecept[0]?.type === 'bun') {
        if (newIngredient.type === 'bun') {
          newRecept[0] = newIngredient;
          newRecept[newRecept.length - 1] = newIngredient;
        } else {
          newRecept.splice(1, 0, newIngredient);
        }
      } else {
        if (newIngredient.type === 'bun') {
          newRecept = [newIngredient, ...newRecept, newIngredient];
        } else {
          newRecept.unshift(newIngredient);
        }
      }

      countReceptPrice(newRecept);

      return newRecept;
    });

    setCurrentIngredient(newIngredient);
    setIsIngredientModalOpen(true);
  };

  const deleteIngredient = (indexToRemove: number): void => {
    const deletedIngredient = ingredients.find(
      (ingredient) => ingredient._id === recept[indexToRemove]._id
    );

    if (deletedIngredient) {
      deletedIngredient.count -= 1;
    }

    setRecept((oldRecept) => {
      const newRecept = oldRecept.filter((_, index) => index !== indexToRemove);

      countReceptPrice(newRecept);

      return newRecept;
    });
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <BurgerIngredients ingredients={ingredients} addIngredient={addIngredient} />
          <BurgerConstructor
            ingredients={recept}
            receptPrice={receptPrice}
            deleteIngredient={deleteIngredient}
            openOrderModal={handleOpenOrderModal}
          />
        </>
      )}

      {isIngredientModalOpen && currentIngredient && (
        <Modal onClose={handleCloseIgredientModal}>
          <IngredientModal ingredient={currentIngredient} />
        </Modal>
      )}
      {isOrderModalOpen && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderModal />
        </Modal>
      )}
    </>
  );
};
