import { useGetIngredientsQuery } from '@/services/constructor/api';
import { getTranslatedStatus } from '@/utils/getTranslatedStatus';
import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { ImgStacker } from '../img-stacker/img-stacker';
import { Price } from '../price/price';

import type { TResposeOrder } from '@/services/ws/api';
import type { TIngredient } from '@/utils/types';

import style from './feed-card.module.css';

type TProps = {
  id: string;
  date: Date;
  name: string;
  price: number;
  ingredientIds: string[];
  status?: TResposeOrder['status'];
  onClick?: () => void;
};

export const FeedCard = ({
  date,
  ingredientIds,
  name,
  id,
  price,
  status,
  onClick,
}: TProps): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);

  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
  };

  const { data, isLoading } = useGetIngredientsQuery('ingredients');

  useEffect(() => {
    if (isLoading && !data) {
      return;
    }

    const ingredients = ingredientIds?.reduce((acc, id) => {
      const ingredient = data?.data.find((ingredient) => ingredient._id === id);

      if (ingredient) {
        acc.push(ingredient);
      }

      return acc;
    }, [] as TIngredient[]);

    setIngredients(ingredients ?? []);
  }, [data]);

  return (
    <div className={style.card} onClick={handleClick}>
      <div className={style.row as string}>
        <span className={clsx('text text_type_digits-default')}>{`#${id}`}</span>
        <FormattedDate
          date={date}
          className="text text_type_main-default text_color_inactive"
        />
      </div>

      <div className={'text text_type_main-large'}>{name}</div>

      {status ? (
        <div className={clsx('text text_type_main-default', style.status as string)}>
          {getTranslatedStatus(status)}
        </div>
      ) : null}

      <div className={style.row as string}>
        <ImgStacker urls={ingredients?.map((item) => item.image)} />
        <Price value={price} />
      </div>
    </div>
  );
};
