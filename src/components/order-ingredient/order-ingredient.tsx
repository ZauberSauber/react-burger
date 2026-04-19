import clsx from 'clsx';

import style from './order-ingredient.module.css';

type TProps = {
  url: string;
  level?: number;
  remainderCount?: number;
};

export const OrderIngredient = ({
  url,
  level = 0,
  remainderCount = 0,
}: TProps): React.JSX.Element => {
  return (
    <div className={clsx(style.container)} style={{ zIndex: level }}>
      <img src={`${url}`} height={56} alt="ingredient" />
      {remainderCount > 0 && (
        <div className={clsx(style.remainder as string, 'text text_type_main-default')}>
          +{remainderCount}
        </div>
      )}
    </div>
  );
};
