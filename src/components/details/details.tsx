import { Price } from '@/components/price/price';
import { ScrollWrapper } from '@/components/scroll-wrapper/scroll-wrapper';
import { useGetIngredientsQuery } from '@/services/constructor/api';
import { getTranslatedStatus } from '@/utils/getTranslatedStatus';
import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';

import { IngredientListItem } from '../ingredient-list-item/ingredient-list-item';

import type { TIngredient, TOrderStatus } from '@/utils/types';

import style from './details.module.css';

type TProps = {
  id: string;
  name: string;
  status: TOrderStatus;
  date: Date;
  ingredientIds: string[];
};

type TCountIngredient = TIngredient & { count: number };

export const Details = ({
  id,
  name,
  status,
  date,
  ingredientIds,
}: TProps): React.JSX.Element => {
  const { data } = useGetIngredientsQuery('ingredients');

  const ingredients: Record<string, TCountIngredient> = {};

  ingredientIds?.forEach((ingredientId) => {
    const ingredient = data?.data?.find((ingredient) => ingredient._id === ingredientId);

    if (!ingredient) {
      return;
    }

    if (ingredient._id in ingredients) {
      ingredients[ingredient?._id].count += 1;
    } else {
      ingredients[ingredient._id] = {
        ...ingredient,
        count: 1,
      };
    }
  });

  const getIngredientsList = (): React.JSX.Element[] => {
    const list: React.JSX.Element[] = [];

    Object.values(ingredients).forEach((ingredient) => {
      list.push(
        <IngredientListItem
          key={ingredient._id}
          name={ingredient.name}
          price={`${ingredient.count} x ${ingredient.price}`}
          url={ingredient.image}
        />
      );
    });

    return list;
  };

  const calcPrice = (): number => {
    let price = 0;

    Object.values(ingredients).forEach((ingredient) => {
      price += ingredient.price * ingredient.count;
    });

    return price;
  };

  return (
    <div className={clsx(style.content as string, style.column as string)}>
      <div className={clsx('text text_type_digits-default', style.order_id as string)}>
        {id}
      </div>
      <div className={clsx('text text_type_main-medium', style.order_name as string)}>
        {name}
      </div>
      <div className={clsx('text text_type_main-default', style.order_status as string)}>
        {getTranslatedStatus(status)}
      </div>
      <div className={clsx('text text_type_main-medium', style.compound as string)}>
        Состав:
      </div>
      <ScrollWrapper
        className={clsx(style.column as string, style.order_list as string)}
      >
        {getIngredientsList()}
      </ScrollWrapper>
      <div className={style.info as string}>
        <FormattedDate
          date={date}
          className="text text_type_main-default text_color_inactive"
        />
        <Price value={calcPrice()} />
      </div>
    </div>
  );
};
