import { Form } from '@/components/form/form';
import { useLazyRegisterQuery } from '@/services/auth/api';
import { setUserState } from '@/services/slices/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { PATHS } from '@/utils/paths';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import style from './register.module.css';

export const RegisterPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: '',
    email: '',
    password: '',
  });

  const [register, { isLoading }] = useLazyRegisterQuery();

  const handleSubmit = (): void => {
    void register(formData)
      .unwrap()
      .then((data) => {
        if (!data.success) {
          return;
        }

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        dispatch(setUserState(data.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.content}>
      <h3 className="text text_type_main-medium">Регистрация</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          extraClass="mt-6"
          value={formData.name}
          placeholder="Имя"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
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
          Зарегестрироваться
        </Button>
      </Form>

      <span className="text text_type_main-small mt-20">
        Уже зарегестрированы? <Link to={PATHS.LOGIN}>Войти</Link>
      </span>
    </div>
  );
};
