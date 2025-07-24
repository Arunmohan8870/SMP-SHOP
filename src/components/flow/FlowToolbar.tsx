import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card } from '@/components/ui/card';
import { Save, FolderOpen, Download, FileText, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { HierarchyData } from '@/lib/flow-utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface FlowToolbarProps {
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
   onViewJson: () => void
  hierarchyData: HierarchyData;
}

export const FlowToolbar: React.FC<FlowToolbarProps> = ({
  onSave,
  onLoad,
  onExport,
  hierarchyData,
}) => {
  const [showJson, setShowJson] = useState(false);
  // console.log('hierarchyData', hierarchyData)
  const handleSave = () => {
    onSave();
    toast.success('Hierarchy saved to localStorage');
  };

  const handleLoad = () => {
    onLoad();
    toast.success('Hierarchy loaded from localStorage');
  };

  const handleExport = () => {
    onExport();
    toast.success('JSON exported successfully');
  };

  return (
    <TooltipProvider>
      <div className="flex items-center justify-center bg-[#F6F8FB]">
        <Card className="p-5 mt-2 flex items-center bg-background border border-border shadow-lg max-w-[700px]">
          <div className="flex items-center gap-2 flex-wrap">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Save size={14} />
                  <span className="hidden sm:inline">Save</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save hierarchy to localStorage</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLoad}
                  className="flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <FolderOpen size={14} />
                  <span className="hidden sm:inline">Load</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Load hierarchy from localStorage</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  className="flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export hierarchy as JSON</TooltipContent>
            </Tooltip>

            {/* <Tooltip> */}
            {/* <TooltipTrigger asChild> */}
            <Dialog open={showJson} onOpenChange={setShowJson}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5 transition-all hover:bg-primary hover:text-white"
                >
                  <Eye size={16} />
                  <span className="hidden sm:inline">View JSON</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-lg">
                    <FileText size={20} />
                    Hierarchy JSON Structure
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-auto max-h-[65vh] whitespace-pre-wrap border font-mono">
                    {JSON.stringify(hierarchyData, null, 2)}
                  </pre>
                </div>
              </DialogContent>
            </Dialog>
            {/* </TooltipTrigger> */}
            {/* <TooltipContent>View hierarchy JSON structure</TooltipContent> */}
            {/* </Tooltip> */}

            <div className="ml-2 text-xs sm:text-sm text-muted-foreground font-medium hidden md:block">
              📊 Visual Page Hierarchy Editor
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>

  );
};
