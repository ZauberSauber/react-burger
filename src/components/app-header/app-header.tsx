import { PATHS } from '@/utils/paths';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { Link, NavLink, type NavLinkRenderProps } from 'react-router-dom';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const isActive = ({ isActive }: NavLinkRenderProps): string =>
    isActive ? `${styles.link} ${styles.link_active}` : styles.link;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to={PATHS.HOME} className={isActive}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </>
            )}
          </NavLink>

          <NavLink to={PATHS.FEED} className={(props) => clsx(isActive(props), 'ml-10')}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Лента заказов</p>
              </>
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Link to={PATHS.HOME}>
            <Logo />
          </Link>
        </div>
        <NavLink
          to={PATHS.PROFILE}
          className={(props) => clsx(isActive(props), styles.link_position_last)}
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
