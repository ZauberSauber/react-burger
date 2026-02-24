import useEscapeKey from '@/utils/useEscapeKey';
import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import type { SyntheticEvent } from 'react';

import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

type TModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: TModalProps): React.JSX.Element => {
  if (!modalRoot) {
    throw new Error('Modal root not found');
  }

  useEscapeKey(onClose);

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <div
        className={clsx(styles.modal_body as string, 'p-10 pb-15')}
        onClick={(e: SyntheticEvent) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          className={styles.close_icon as string}
          type="primary"
          onClick={onClose}
        />
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};
