
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, StopCircle } from 'lucide-react';
import ConfirmationDialog from './ConfirmationDialog';

interface BulkActionsProps {
  selectedNamespace: string;
  filteredServicesCount: number;
  onRestartAll: (reason: string) => void;
  onStopAll: (reason: string) => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedNamespace,
  filteredServicesCount,
  onRestartAll,
  onStopAll
}) => {
  return (
    <div className="flex gap-2">
      <ConfirmationDialog
        trigger={
          <Button variant="destructive" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Restart All Services
          </Button>
        }
        title="Confirm restart all services"
        description={`Are you sure you want to restart all services in namespace ${selectedNamespace}? This will affect ${filteredServicesCount} services and may cause temporary service disruption.`}
        onConfirm={onRestartAll}
        confirmText="Confirm Restart"
        confirmButtonVariant="destructive"
        requireReason={true}
      />
      <ConfirmationDialog
        trigger={
          <Button variant="outline" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 border-orange-200 hover:border-orange-300">
            <StopCircle className="h-4 w-4" />
            Stop All Services
          </Button>
        }
        title="Confirm stop all services"
        description={`Are you sure you want to stop all services in namespace ${selectedNamespace}? This will affect ${filteredServicesCount} services and make all services unavailable.`}
        onConfirm={onStopAll}
        confirmText="Confirm Stop"
        confirmButtonVariant="destructive"
        requireReason={true}
      />
    </div>
  );
};

export default BulkActions;
