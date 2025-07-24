import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { PageNode } from './flow/PageNode';
import { FlowToolbar } from './flow/FlowToolbar';
import {
  HierarchyData,
  defaultHierarchy,
  createFlowElements,
  saveToLocalStorage,
  loadFromLocalStorage,
  exportAsJSON,
} from '@/lib/flow-utils';
import { toast } from 'sonner';

const nodeTypes = {
  pageNode: PageNode,
};

export const VisualPageHierarchyEditor: React.FC = () => {
  const [hierarchyData, setHierarchyData] = useState<HierarchyData>(defaultHierarchy);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  
  useEffect(() => {
    const { nodes: initialNodes, edges: initialEdges } = createFlowElements(hierarchyData);
    
 
    const enhancedNodes = initialNodes.map(node => {
      if (node.id === 'home') {
        return {
          ...node,
          data: {
            ...node.data,
            onSectionsReorder: (newSections: string[]) => {
              setHierarchyData(prev => ({
                ...prev,
                sections: {
                  ...prev.sections,
                  home: newSections,
                },
              }));
            },
          },
        };
      }
      return node;
    });
    
    setNodes(enhancedNodes);
    setEdges(initialEdges);
  }, [hierarchyData, setNodes, setEdges]);

  const handleSave = useCallback(() => {
    const success = saveToLocalStorage(hierarchyData);
    if (!success) {
      toast.error('Failed to save hierarchy');
    }
  }, [hierarchyData]);

  const handleLoad = useCallback(() => {
    const loadedData = loadFromLocalStorage();
    if (loadedData) {
      setHierarchyData(loadedData);
      toast.success('Hierarchy loaded successfully');
    } else {
      toast.info('No saved hierarchy found, using default');
      setHierarchyData(defaultHierarchy);
    }
  }, []);

  const handleExport = useCallback(() => {
    exportAsJSON(hierarchyData);
  }, [hierarchyData]);

  const handleViewJson = useCallback(() => {
    console.log(JSON.stringify(hierarchyData, null, 2));
  }, [hierarchyData]);

  return (
    <div className="flow-editor">
      <FlowToolbar
        onSave={handleSave}
        onLoad={handleLoad}
        onExport={handleExport}
        onViewJson={handleViewJson}
        hierarchyData={hierarchyData}
      />
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
          minZoom: 0.5,
          maxZoom: 1.2,
        }}
        minZoom={0.3}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        className="bg-gradient-to-br from-slate-50 to-slate-100"
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="#e2e8f0"
        />
        <Controls 
          className="!bg-white !border !border-border !shadow-lg"
          showZoom
          showFitView
          showInteractive={false}
        />
        <MiniMap 
          nodeColor={(node) => {
            const level = node.data?.level || 1;
            const colors = {
              1: '#f97316',  
              2: '#3b82f6', 
              3: '#10b981',  
            };
            return colors[level as keyof typeof colors] || colors[3];
          }}
          className="!bg-white !border !border-border !shadow-lg"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
};