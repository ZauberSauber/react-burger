import styles from './modal-overlay.module.css';

type TModalOVerlayProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export const ModalOverlay = ({
  children,
  onClick,
}: TModalOVerlayProps): React.JSX.Element => {
  return (
    <div className={styles.modal_overlay} onClick={onClick}>
      {children}
    </div>
  );
};
