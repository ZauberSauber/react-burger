import { FeedCard } from '@/components/feed-card/feed-card';
import { ModalOrderDetails } from '@/components/modal-order-details/modal-order-details';
import { ScrollWrapper } from '@/components/scroll-wrapper/scroll-wrapper';
import { useGetIngredientsQuery } from '@/services/constructor/api';
import { useGetOrdersQuery } from '@/services/ws/api';
import { PATHS } from '@/utils/paths';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FeedDetailsPage } from '../feed-details/feed-details';

import style from './profile-order.module.css';

export const ProfileOrderPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { bg: string };

  const { id } = useParams();

  const { data, isLoading } = useGetOrdersQuery({ withToken: true });
  const { data: ingredientsData, isLoading: isIngredientsLoading } =
    useGetIngredientsQuery('ingredients');

  const getContent = (): React.JSX.Element => {
    if (isLoading || isIngredientsLoading) {
      return (
        <>
          <span className="text text_type_main-large">Загружаем Ваши заказы</span>
          <Preloader />
        </>
      );
    }

    if (!isLoading && !data?.orders.length) {
      return <span className="text text_type_main-large">У Вас нет заказов</span>;
    }

    return (
      <>
        {data?.orders.map((order) => (
          <FeedCard
            key={order._id}
            id={`${order.number}`}
            date={new Date(order.createdAt)}
            price={order.ingredients.reduce((acc, order) => {
              acc += Number(
                ingredientsData?.data?.find((ingredient) => ingredient._id === order)
                  ?.price ?? 0
              );

              return acc;
            }, 0)}
            name={order.name}
            ingredientIds={order.ingredients}
            status={order.status}
            onClick={() =>
              void navigate(`${PATHS.PROFILE}/order/${order._id}`, {
                state: { bg: location },
              })
            }
          />
        ))}
      </>
    );
  };

  return !locationState?.bg && id ? (
    <FeedDetailsPage />
  ) : (
    <>
      <ScrollWrapper className={style.wrapper}>{getContent()}</ScrollWrapper>
      {locationState?.bg ? <ModalOrderDetails /> : null}
    </>
  );
};
