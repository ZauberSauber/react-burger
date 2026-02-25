import { useDrop } from 'react-dnd';

type TDropTargetProps<T> = {
  children: React.ReactNode;
  accept: string | string[];
  className?: string;
  onDrop?: (item: T) => void;
};

export const DropTarget = <T,>({
  children,
  accept,
  className,
  onDrop,
}: TDropTargetProps<T>): React.ReactElement => {
  const [, dropTarget] = useDrop({
    accept,
    drop: onDrop,
  });

  return (
    <div
      className={className ?? className}
      ref={dropTarget as unknown as React.RefObject<HTMLDivElement>}
    >
      {children}
    </div>
  );
};
