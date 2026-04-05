import { Outlet } from 'react-router-dom';

import { AppHeader } from '../app-header/app-header';
import { ModalOrder } from '../modal-order/modal-order';

export const Layout = (): React.JSX.Element => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <ModalOrder />
    </>
  );
};
