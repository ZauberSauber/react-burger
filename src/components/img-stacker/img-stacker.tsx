import { OrderIngredient } from '../order-ingredient/order-ingredient';

import style from './img-stacker.module.css';

type TProps = {
  urls: string[];
};

const MAX_LEVEL = 6;

export const ImgStacker = ({ urls }: TProps): React.JSX.Element => {
  return (
    <div className={style.container as string}>
      {urls.map((url, index) => {
        const level = MAX_LEVEL - index;
        let remainderCount = 0;

        if (level === 1) {
          remainderCount = urls.length - index - 1;
        }

        if (level < 1) {
          return null;
        }

        return (
          <OrderIngredient
            key={index}
            level={level}
            remainderCount={remainderCount}
            url={url}
          />
        );
      })}
    </div>
  );
};
