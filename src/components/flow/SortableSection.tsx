import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableSectionProps {
  id: string;
}

export const SortableSection: React.FC<SortableSectionProps> = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flow-node-section text-xs px-3 py-2 rounded-md flex items-center gap-2 
        transition-all duration-200 hover:scale-105 ${isDragging ? 'opacity-50 scale-95' : ''}
      `}
      {...attributes}
    >
      <div
        {...listeners}
        className="cursor-grab hover:cursor-grabbing flex-shrink-0"
      >
        <GripVertical size={12} />
      </div>
      <span className="flex-1 text-center font-medium">{id}</span>
    </div>
  );
};