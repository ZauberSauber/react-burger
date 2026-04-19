import { useUserQuery } from '@/services/auth/api';
import { PATHS } from '@/utils/paths';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const onlyUnAuthPaths = [
  PATHS.LOGIN,
  PATHS.REGISTER,
  PATHS.FORGOT_PASSWORD,
  PATHS.RESET_PASSWORD,
];
const onlyAuthPaths = [PATHS.PROFILE];

export const ProtectedRoute = (): React.JSX.Element => {
  const {
    isLoading: isUserLoading,
    isError,
    isSuccess,
  } = useUserQuery('', { refetchOnMountOrArgChange: true });
  const location = useLocation();

  if (isUserLoading) {
    return <Preloader />;
  }

  // не авторизован и роут только для авторизованных
  if (isError && onlyAuthPaths.includes(`/${location.pathname.split('/')[1]}`)) {
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />;
  }

  // авторизован, но роут только для неавторизованных
  if (isSuccess && onlyUnAuthPaths.includes(`/${location.pathname.split('/')[1]}`)) {
    const locationState = (location.state as { from: { pathname: string } }) ?? {
      from: { pathname: PATHS.HOME },
    };

    return <Navigate to={locationState.from} replace />;
  }

  return <Outlet />;
};
