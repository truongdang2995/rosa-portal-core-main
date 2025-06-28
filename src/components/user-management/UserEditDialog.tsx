
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserInfo {
  userId: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  balance: string;
  kycLevel: string;
}

interface UserEditDialogProps {
  open: boolean;
  onClose: () => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  onUpdate: () => void;
}

const UserEditDialog: React.FC<UserEditDialogProps> = ({
  open,
  onClose,
  userInfo,
  setUserInfo,
  onUpdate
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin User</DialogTitle>
          <DialogDescription>Cập nhật thông tin chi tiết của người dùng</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Tên</Label>
            <Input 
              value={userInfo.name}
              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
            />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input 
              value={userInfo.email}
              onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
            />
          </div>
          <div className="grid gap-2">
            <Label>Trạng thái</Label>
            <Select value={userInfo.status} onValueChange={(value) => setUserInfo({...userInfo, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>KYC Level</Label>
            <Select value={userInfo.kycLevel} onValueChange={(value) => setUserInfo({...userInfo, kycLevel: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="level1">Level 1</SelectItem>
                <SelectItem value="level2">Level 2</SelectItem>
                <SelectItem value="level3">Level 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Hủy
          </Button>
          <Button 
            onClick={onUpdate} 
            className="bg-pink-500 hover:bg-pink-600 text-white dark:bg-pink-600 dark:hover:bg-pink-700"
          >
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;
