import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card } from '@/components/ui/card';
import { Monitor, Smartphone } from 'lucide-react';

interface ResponsiveFlowWrapperProps {
  children: React.ReactNode;
}

export const ResponsiveFlowWrapper: React.FC<ResponsiveFlowWrapperProps> = ({ children }) => {
  const isMobile = useIsMobile();
// const [newItem,setNewItem ]= useState(false)

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Monitor className="h-12 w-12 text-muted-foreground" />
              <Smartphone className="h-6 w-6 text-primary absolute -bottom-1 -right-1" />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2">Desktop Experience Recommended</h2>
          <p className="text-muted-foreground mb-4">
            The Visual Page Hierarchy Editor is optimized for desktop screens to provide 
            the best experience with drag-and-drop functionality and visual flow editing.
          </p>
          <p className="text-sm text-muted-foreground">
            Please access this tool from a desktop or tablet device for the full experience.
          </p>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};