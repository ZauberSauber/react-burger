import { Form } from '@/components/form/form';
import { usePasswordResetMutation } from '@/services/auth/api';
import { PATHS } from '@/utils/paths';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import style from './reset-password.module.css';

export const ResetPasswordPage = (): React.JSX.Element => {
  const [resetPassword, { isLoading }] = usePasswordResetMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { from?: { pathname: string } };

  const [formData, setFormData] = useState<{
    password: string;
    token: string;
  }>({
    password: '',
    token: '',
  });

  const handleSubmit = (): void => {
    void resetPassword(formData)
      .unwrap()
      .then((data) => {
        if (!data.success) {
          return;
        }

        void navigate(PATHS.LOGIN);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (locationState?.from?.pathname !== PATHS.FORGOT_PASSWORD) {
    return <Navigate to={PATHS.HOME} replace />;
  }

  return (
    <div className={style.content}>
      <h3 className="text text_type_main-medium">Восстановление пароля</h3>
      <Form onSubmit={handleSubmit}>
        <PasswordInput
          extraClass="mt-6"
          icon="ShowIcon"
          name="password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          value={formData.password}
          placeholder="Введите новый пароль"
        />
        <Input
          extraClass="mt-6"
          value={formData.token}
          onChange={(e) => setFormData({ ...formData, token: e.target.value })}
          placeholder="Введите код из письма"
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
          Сохранить
        </Button>
      </Form>

      <span className="text text_type_main-small mt-20">
        Вспомнили пароль? <Link to={PATHS.LOGIN}>Войти</Link>
      </span>
    </div>
  );
};
