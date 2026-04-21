import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { dndManager } from '@/utils/dnd';
import { DndProvider } from 'react-dnd';
import { Outlet, useLocation } from 'react-router-dom';

import styles from './home.module.css';

export const Home = (): React.JSX.Element => {
  const location = useLocation();

  return (
    <>
      {!(location.pathname !== '/' && !(location.state as { bg: string })?.bg) ? (
        <>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
            Соберите бургер
          </h1>
          <main className={`${styles.main} pl-5 pr-5`}>
            <DndProvider manager={dndManager}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </>
      ) : null}

      <Outlet />
    </>
  );
};
