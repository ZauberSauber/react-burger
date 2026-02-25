import { useEffect, useCallback } from 'react';

type THandleCloseFn = () => void;

const useEscapeKey = (handleClose: THandleCloseFn): void => {
  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return (): void => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);
};

export default useEscapeKey;
