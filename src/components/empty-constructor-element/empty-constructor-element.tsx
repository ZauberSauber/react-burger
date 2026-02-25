import clsx from 'clsx';

import styles from './empty-constructor-element.module.css';

type TEmptyConstructorElementProps = {
  type?: 'top' | 'bottom';
  text?: string;
  className?: string;
};

export const EmptyConstructorElement = ({
  type,
  text = '',
  className,
}: TEmptyConstructorElementProps): React.JSX.Element => {
  const modClass = (type ? styles[`emptyElement_${type}`] : '') as string;

  return (
    <div className={clsx(styles.emptyElement as string, modClass, className)}>
      <span className="text text_type_main-default">{text}</span>
    </div>
  );
};
