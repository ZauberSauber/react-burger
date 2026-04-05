import { Form } from '@/components/form/form';
import { useLazyPasswordRecoverQuery } from '@/services/auth/api';
import { PATHS } from '@/utils/paths';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import style from './forgot-password.module.css';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const [recoverPassword, { isLoading }] = useLazyPasswordRecoverQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: '',
  });

  const handleSubmit = (): void => {
    void recoverPassword(formData)
      .unwrap()
      .then((data) => {
        if (!data.success) {
          return;
        }
        void navigate(PATHS.RESET_PASSWORD, { state: { from: location } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.content}>
      <h3 className="text text_type_main-medium">Восстановление пароля</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          extraClass="mt-6"
          value={formData.email}
          onChange={(e) => setFormData({ email: e.target.value })}
          placeholder="Укажите e-mail"
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
          Восстановить
        </Button>
      </Form>

      <span className="text text_type_main-small mt-20">
        Вспомнили пароль? <Link to={PATHS.LOGIN}>Войти</Link>
      </span>
    </div>
  );
};
