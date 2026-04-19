import { Form } from '@/components/form/form';
import { useLazyLoginQuery } from '@/services/auth/api';
import { setCacheKey } from '@/services/slices/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { PATHS } from '@/utils/paths';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import style from './login.module.css';

export const LoginPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { from: { pathname: string } } | undefined;
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLazyLoginQuery();

  const handleSubmit = (): void => {
    void login(formData)
      .then((result) => {
        if (result.data?.success) {
          if (locationState?.from) {
            dispatch(setCacheKey(`${new Date().getTime()}`));
            void navigate(locationState.from.pathname);
          } else {
            void navigate(PATHS.HOME);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.content}>
      <h3 className={clsx('text text_type_main-medium', style.title as string)}>Вход</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          extraClass="mt-6"
          value={formData.email}
          placeholder="E-mail"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <PasswordInput
          extraClass="mt-6"
          icon="ShowIcon"
          name="password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          value={formData.password}
        />
        <Button
          extraClass="mt-6"
          size="medium"
          type="primary"
          htmlType="submit"
          disabled={
            Object.values(formData).find((value) => value === '') === '' || isLoading
          }
        >
          Войти
        </Button>
      </Form>

      <span className="text text_type_main-small mt-20">
        Вы — новый пользователь? <Link to={PATHS.REGISTER}>Зарегестрироваться</Link>
      </span>
      <span className="text text_type_main-small mt-4">
        Забыли пароль? <Link to={PATHS.FORGOT_PASSWORD}>Восстановить пароль</Link>
      </span>
    </div>
  );
};
