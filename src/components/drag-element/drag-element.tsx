import { useDrag } from 'react-dnd';

type TDragElementProps = {
  children: React.ReactNode;
  data: {
    id: string;
    type: string;
    [key: string]: unknown;
  };
};

export const DragElement = ({
  children,
  data,
}: TDragElementProps): React.JSX.Element => {
  const { type } = data;
  const [collected, drag] = useDrag<unknown, unknown, { isDragging: boolean }>({
    type,
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return !collected.isDragging ? (
    <div {...collected} ref={drag as unknown as React.RefObject<HTMLDivElement>}>
      {children}
    </div>
  ) : (
    <>{children}</>
  );
};
