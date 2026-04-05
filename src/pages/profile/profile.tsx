import { Form } from '@/components/form/form';
import {
  useLazyChangeUserQuery,
  useLazyLogoutQuery,
  useUserQuery,
} from '@/services/auth/api';
import { PATHS } from '@/utils/paths';
import {
  Button,
  Input,
  PasswordInput,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  type NavLinkRenderProps,
} from 'react-router-dom';

import style from './profile.module.css';

type TFormData = {
  name: string;
  email: string;
  password: string;
};

const INIT_DATA: TFormData = {
  name: '',
  email: '',
  password: '',
};

export const ProfilePage = (): React.JSX.Element => {
  const { data: userData, isLoading: isUserLoading } = useUserQuery('');

  const [changeUserQuery] = useLazyChangeUserQuery();
  const [logOutQuery] = useLazyLogoutQuery();

  const location = useLocation();
  const navigate = useNavigate();

  const [isDataChanged, setIsDataChanged] = useState(false);
  const [initialValues, setInitialValues] = useState<TFormData>(INIT_DATA);
  const [formData, setFormData] = useState<TFormData>(INIT_DATA);

  const isLinkActive = ({ isActive }: NavLinkRenderProps): string =>
    isActive ? `${style.link} ${style.link_active}` : (style.link as string);

  useEffect(() => {
    if (userData) {
      const initData = {
        name: userData.user.name,
        email: userData.user.email,
        password: '',
      };

      setFormData(initData);
      setInitialValues(initData);
    }
  }, [userData]);

  useEffect(() => {
    let isChanged = false;

    for (const key in formData) {
      if ((key as keyof TFormData) === 'password') {
        continue;
      }

      if (formData[key as keyof TFormData] !== initialValues[key as keyof TFormData]) {
        isChanged = true;
        break;
      }
    }

    setIsDataChanged(isChanged);
  }, [formData, initialValues]);

  const handleSubmit = (): void => {
    void changeUserQuery(formData);
  };

  const handleCancel = (): void => {
    setFormData(initialValues);
  };

  if (isUserLoading) {
    return <Preloader />;
  }

  return (
    <div className={clsx(style.content, 'mt-30')}>
      <section className={clsx(style.navSection as string, 'pr-15')}>
        <nav className={style.nav as string}>
          <NavLink
            className={(props) => {
              console.log(props);
              return clsx(
                isLinkActive(props),
                style.navItem as string,
                'text text_type_main-medium'
              );
            }}
            to={PATHS.PROFILE}
            end
          >
            Профиль
          </NavLink>
          <NavLink
            className={(props) =>
              clsx(
                isLinkActive(props),
                style.navItem as string,
                'text text_type_main-medium'
              )
            }
            to={PATHS.PROFILE_ORDER}
            end
          >
            История заказов
          </NavLink>
          <span
            className={clsx(
              style.navItem as string,
              style.exit as string,
              'text text_type_main-medium'
            )}
            onClick={() => {
              const token = localStorage.getItem('refreshToken') ?? '';

              if (!token) {
                return;
              }

              void logOutQuery({
                token,
              })
                .then(() => {
                  void navigate(PATHS.HOME);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Выход
          </span>
        </nav>
        <span
          className={clsx(
            style.info as string,
            'text text_type_main-default text_color_inactive'
          )}
        >
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </section>
      <section>
        {location.pathname === PATHS.PROFILE ? (
          <Form onSubmit={handleSubmit}>
            <Input
              icon="EditIcon"
              value={formData.name}
              placeholder="Имя"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              extraClass="mt-6"
              icon="EditIcon"
              value={formData.email}
              placeholder="Логин"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <PasswordInput
              extraClass="mt-6"
              icon="EditIcon"
              name="password"
              value={formData.password}
              placeholder="Пароль"
              disabled={false}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {isDataChanged ? (
              <div className={clsx(style.buttons as string, 'mt-6')}>
                <Button
                  onClick={handleCancel}
                  size="medium"
                  type="secondary"
                  htmlType="button"
                >
                  Отмена
                </Button>
                <Button size="medium" type="primary" htmlType="submit">
                  Сохранить
                </Button>
              </div>
            ) : null}
          </Form>
        ) : (
          <Outlet />
        )}
      </section>
    </div>
  );
};
