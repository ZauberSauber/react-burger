import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './components/layour/layout';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { FeedPage } from './pages/feed/feed';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password';
import { Home } from './pages/home/home';
import { IngredientsPage } from './pages/ingredients/ingredients';
import { LoginPage } from './pages/login/login';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { ProfileOrderPage } from './pages/profile-order/profile-order';
import { ProfilePage } from './pages/profile/profile';
import { RegisterPage } from './pages/register/register';
import { ResetPasswordPage } from './pages/reset-password/reset-password';
import { PATHS } from './utils/paths';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: PATHS.HOME,
        element: <Home />,
        children: [
          {
            path: `${PATHS.INGREDIENTS}/:id`,
            element: <IngredientsPage />,
          },
        ],
      },
      {
        path: PATHS.FEED,
        element: <FeedPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: PATHS.PROFILE,
            element: <ProfilePage />,
            children: [
              {
                path: PATHS.PROFILE_ORDER,
                element: <ProfileOrderPage />,
              },
            ],
          },
          {
            path: PATHS.LOGIN,
            element: <LoginPage />,
          },
          {
            path: PATHS.REGISTER,
            element: <RegisterPage />,
          },
          {
            path: PATHS.RESET_PASSWORD,
            element: <ResetPasswordPage />,
          },
          {
            path: PATHS.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
