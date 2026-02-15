import { AppHeader } from '@components/app-header/app-header';

import { ConstructorController } from '../constructor-controller/constructor-controller';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <ConstructorController />
      </main>
    </div>
  );
};

export default App;
