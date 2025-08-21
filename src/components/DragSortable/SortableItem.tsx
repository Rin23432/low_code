import React, { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type PropsType = {
  id: string;
  children: JSX.Element;
};

const SortableItem: FC<PropsType> = (props: PropsType) => {
  const { id, children } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ffffffff',
    margin: '4px 0',
    backgroundColor: '#ffffffff',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableItem;
