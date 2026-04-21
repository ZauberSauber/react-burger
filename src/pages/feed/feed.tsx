import { FeedCard } from '@/components/feed-card/feed-card';
import { useGetIngredientsQuery } from '@/services/constructor/api';
import { useGetOrdersQuery } from '@/services/ws/api';
import { PATHS } from '@/utils/paths';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import style from './feed.module.css';

export const FeedPage = (): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading: isOrdersLoading } = useGetOrdersQuery({});
  const { data: ingredientsData, isLoading: isIngredientsLoading } =
    useGetIngredientsQuery('ingredients');

  return (
    <>
      {!(location.pathname !== PATHS.FEED && !(location.state as { bg: string })?.bg) ? (
        <div className={style.page as string}>
          <h1
            className={clsx(
              style.title as string,
              `text text_type_main-large mt-10 mb-5 pl-5`
            )}
          >
            Лента заказов
          </h1>
          <div className={style.content}>
            <section>
              <div className={clsx('custom-scroll', style.order_list as string)}>
                {isOrdersLoading || isIngredientsLoading ? (
                  <Preloader />
                ) : (
                  data?.orders?.map((order) => (
                    <FeedCard
                      id={`${order.number}`}
                      date={new Date(order.createdAt)}
                      key={order._id}
                      name={order.name}
                      ingredientIds={order.ingredients}
                      price={order.ingredients.reduce((acc, order) => {
                        acc += Number(
                          ingredientsData?.data?.find(
                            (ingredient) => ingredient._id === order
                          )?.price ?? 0
                        );

                        return acc;
                      }, 0)}
                      onClick={() =>
                        void navigate(`${PATHS.FEED}/${order._id}`, {
                          state: { bg: location },
                        })
                      }
                    />
                  ))
                )}
              </div>
            </section>

            <section className={style.tablo as string}>
              <div className={style.orders_state as string}>
                <div className={style.orders_state_wrapper as string}>
                  <span
                    className={clsx(
                      style.state_title as string,
                      'text text_type_main-medium'
                    )}
                  >
                    Готовы:
                  </span>
                  <div
                    className={clsx(
                      'custom-scroll',
                      style.orders_state_list as string,
                      style.orders_state_ready as string
                    )}
                  >
                    {data?.orders
                      ?.filter((order) => order.status === 'done')
                      .map((order) => (
                        <span
                          key={order._id}
                          className={'text text_type_digits-default'}
                        >
                          {order.number}
                        </span>
                      ))}
                  </div>
                </div>
                <div className={style.orders_state_wrapper as string}>
                  <span
                    className={clsx(
                      style.state_title as string,
                      'text text_type_main-medium'
                    )}
                  >
                    В работе:
                  </span>
                  <div
                    className={clsx('custom-scroll', style.orders_state_list as string)}
                  >
                    {data?.orders
                      ?.filter((order) => order.status === 'pending')
                      .map((order) => (
                        <span
                          key={order._id}
                          className={'text text_type_digits-default'}
                        >
                          {order.number}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className={style.total as string}>
                <span className={'text text_type_main-medium'}>
                  Выполнено за все время:
                </span>
                <span
                  className={clsx(
                    style.total_count as string,
                    'text text_type_digits-large'
                  )}
                >
                  {data?.total ?? '-'}
                </span>
              </div>

              <div className={style.total as string}>
                <span className={'text text_type_main-medium'}>
                  Выполнено за сегодня:
                </span>
                <span
                  className={clsx(
                    style.total_count as string,
                    'text text_type_digits-large'
                  )}
                >
                  {data?.totalToday ?? '-'}
                </span>
              </div>
            </section>
          </div>
        </div>
      ) : null}

      <Outlet />
    </>
  );
};
