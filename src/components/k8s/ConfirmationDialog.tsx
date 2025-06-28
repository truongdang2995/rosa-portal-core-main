
import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface ConfirmationDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  onConfirm: (reason?: string) => Promise<void> | void;
  confirmText?: string;
  confirmButtonVariant?: 'default' | 'destructive';
  requireReason?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  trigger,
  title,
  description,
  onConfirm,
  confirmText = 'Confirm',
  confirmButtonVariant = 'default',
  requireReason = false
}) => {
  const [reason, setReason] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      if (requireReason) {
        await onConfirm(reason);
      } else {
        await onConfirm();
      }
      setIsOpen(false);
      setReason('');
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!isLoading) {
      setIsOpen(open);
      if (!open) {
        setReason('');
      }
    }
  };

  const isDisabled = requireReason && !reason.trim();

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {requireReason && (
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for this action *</Label>
            <Textarea
              id="reason"
              placeholder="Please enter the reason for this action..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              disabled={isLoading}
            />
          </div>
        )}
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            disabled={isDisabled || isLoading}
            className={confirmButtonVariant === 'destructive' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
