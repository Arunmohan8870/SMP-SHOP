import dagre from 'dagre';
import { Node, Edge, Position } from '@xyflow/react';

export interface PageNode {
  id: string;
  label: string;
  level: number;
  type: 'page' | 'section';
  sections?: string[];
}

export interface HierarchyData {
  pages: PageNode[];
  sections: { [key: string]: string[] };
}

export const defaultHierarchy: HierarchyData = {
  pages: [
   
    { id: 'home', label: 'Home', level: 1, type: 'page' },
    { id: 'about', label: 'About', level: 2, type: 'page' },
    { id: 'services', label: 'Services', level: 2, type: 'page' },
    { id: 'blog', label: 'Blog', level: 2, type: 'page' },
    { id: 'contact', label: 'Contact', level: 2, type: 'page' },
    { id: 'service-detail-1', label: 'Service Detail 1', level: 3, type: 'page' },
    { id: 'service-detail-2', label: 'Service Detail 2', level: 3, type: 'page' },
    { id: 'blog-post-1', label: 'Blog Post 1', level: 3, type: 'page' },
    { id: 'blog-post-2', label: 'Blog Post 2', level: 3, type: 'page' },
    { id: 'author-page', label: 'Author Page', level: 3, type: 'page' },
    { id: 'location-info', label: 'Location Info', level: 3, type: 'page' },
    { id: 'support-page', label: 'Support Page', level: 3, type: 'page' },
  ],
  sections: {
    home: ['Hero', 'Features', 'Testimonials', 'CTA', 'Footer']
  }
};


export const pageRelationships = [
  { source: 'home', target: 'about' },
  { source: 'home', target: 'services' },
  { source: 'home', target: 'blog' },
  { source: 'home', target: 'contact' },
  { source: 'services', target: 'service-detail-1' },
  { source: 'services', target: 'service-detail-2' },
  { source: 'blog', target: 'blog-post-1' },
  { source: 'blog', target: 'blog-post-2' },
  { source: 'blog', target: 'author-page' },
  { source: 'contact', target: 'location-info' },
  { source: 'contact', target: 'support-page' },
];

export const createFlowElements = (hierarchyData: HierarchyData) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({
    rankdir: 'TB',
    nodesep: 100,
    ranksep: 120,
    marginx: 50,
    marginy: 50,
  });

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  hierarchyData.pages.forEach((page) => {
    dagreGraph.setNode(page.id, { width: 200, height: 80 });
    
    nodes.push({
      id: page.id,
      type: 'pageNode',
      data: { 
        label: page.label, 
        level: page.level,
        sections: page.id === 'home' ? hierarchyData.sections.home || [] : undefined
      },
      position: { x: 0, y: 0 },
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
    });
  });

  
  pageRelationships.forEach((rel) => {
    dagreGraph.setEdge(rel.source, rel.target);
    
    edges.push({
      id: `${rel.source}-${rel.target}`,
      source: rel.source,
      target: rel.target,
      type: 'smoothstep',
      animated: false,
      style: { strokeWidth: 2, stroke: '#94a3b8' },
    });
  });

 
  dagre.layout(dagreGraph);

 
  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWithPosition.width / 2,
      y: nodeWithPosition.y - nodeWithPosition.height / 2,
    };
  });

  return { nodes, edges };
};

export const saveToLocalStorage = (value: HierarchyData) => {
  try {
    localStorage.setItem('pageHierarchy', JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
};
export const loadFromLocalStorage = (): HierarchyData | null => {
  try {
    const saved = localStorage.getItem('pageHierarchy');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};
// const handleNewOrder = ()=>{
//   try {
//     const response = 
//   }
// }
export const exportAsJSON = (data: HierarchyData) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'page-hierarchy.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};