import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableSection } from './SortableSection';

interface PageNodeProps {
  data: {
    id: string;
    label: string;
    level: number;
    sections?: string[];
    onSectionsReorder?: (sections: string[]) => void;
  };
  isConnectable: boolean;
}

export const PageNode: React.FC<PageNodeProps> = ({ data, isConnectable }) => {
  const { label, level, sections = [], onSectionsReorder } = data;
  
  const getNodeClass = () => {
    switch (level) {
      case 1:
        return 'flow-node flow-node-level-1 min-w-[250px]';
      case 2:
        return 'flow-node flow-node-level-2 min-w-[200px]';
      case 3:
        return 'flow-node flow-node-level-3 min-w-[180px]';
      default:
        return 'flow-node min-w-[180px]';
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log('active', active)
    if (!over || active.id === over.id) return;
    
    const oldIndex = sections.indexOf(active.id as string);
    const newIndex = sections.indexOf(over.id as string);
    
    if (oldIndex !== -1 && newIndex !== -1) {
      const newSections = [...sections];
      const [removed] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, removed);
      onSectionsReorder?.(newSections);
    }
  };

  const getLevelIndicator = () => {
    const colors = {
      1: 'bg-orange-100 text-orange-800 border-orange-200',
      2: 'bg-blue-100 text-blue-800 border-blue-200',
      3: 'bg-green-100 text-green-800 border-green-200',
    };
    
    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${colors[level as keyof typeof colors] || colors[3]} mb-2`}>
        Level {level}
      </div>
    );
  };

  return (
    <div className={getNodeClass()}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="!bg-white !border-2 !border-gray-300 !w-3 !h-3"
      />
      
      <div className="p-2">
        {getLevelIndicator()}
        <div className="font-semibold text-lg mb-2">{label}</div>
        
        
        {label === 'Home' && sections.length > 0 && (
          <div className="mt-3">
            <div className="text-sm font-medium mb-2 opacity-90">Page Sections:</div>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={sections} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <SortableSection key={section} id={section} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="!bg-white !border-2 !border-gray-300 !w-3 !h-3"
      />
    </div>
  );
};