import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type TDragSortElementProps = {
  children: React.ReactNode;
  data: {
    id: string;
    [key: string]: unknown;
  };
};

export const DragSortElement = ({
  children,
  data,
}: TDragSortElementProps): React.JSX.Element => {
  const { id } = data;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};
