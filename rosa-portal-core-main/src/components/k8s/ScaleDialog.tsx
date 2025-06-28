
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Scale } from 'lucide-react';

interface ScaleDialogProps {
  serviceName: string;
  currentReplicas: number;
  onConfirm: (serviceName: string, newReplicas: number, reason: string) => void;
}

const ScaleDialog: React.FC<ScaleDialogProps> = ({
  serviceName,
  currentReplicas,
  onConfirm
}) => {
  const [newReplicas, setNewReplicas] = useState('');
  const [reason, setReason] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    const replicaCount = parseInt(newReplicas);
    if (reason.trim() && !isNaN(replicaCount) && replicaCount >= 0) {
      onConfirm(serviceName, replicaCount, reason);
      setIsOpen(false);
      setReason('');
      setNewReplicas('');
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setReason('');
      setNewReplicas('');
    }
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setNewReplicas(value);
    }
  };

  const replicaCount = parseInt(newReplicas);
  const isValidReplicas = !isNaN(replicaCount) && replicaCount >= 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Scale className="h-3 w-3" />
          Scale
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scale Service: {serviceName}</DialogTitle>
          <DialogDescription>
            Thay đổi số lượng replicas cho service và nhập lý do thực hiện.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="replicas">Số lượng Replicas</Label>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">Hiện tại: {currentReplicas}</span>
              <span className="text-sm text-muted-foreground">→</span>
              <Input
                id="replicas"
                type="text"
                placeholder="Nhập số replicas"
                value={newReplicas}
                onChange={handleNumberInput}
                className="w-32"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="reason">Lý do thực hiện *</Label>
            <Textarea
              id="reason"
              placeholder="Nhập lý do cần scale service..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Hủy
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!reason.trim() || !isValidReplicas || replicaCount === currentReplicas}
          >
            Xác nhận Scale
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScaleDialog;
