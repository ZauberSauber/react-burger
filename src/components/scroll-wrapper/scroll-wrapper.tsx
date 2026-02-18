import clsx from 'clsx';

import styles from './scroll-wrapper.module.css';

type TScrollWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export const ScrollWrapper = ({
  children,
  className,
}: TScrollWrapperProps): React.JSX.Element => (
  <div className={clsx(styles.scroll_wrapper, className)}>{children}</div>
);
