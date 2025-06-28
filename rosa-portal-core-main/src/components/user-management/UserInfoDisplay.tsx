
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Edit } from 'lucide-react';

interface User {
  userId: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  balance: string;
  kycLevel: string;
}

interface UserInfoDisplayProps {
  user: User;
  onEdit: () => void;
}

const UserInfoDisplay: React.FC<UserInfoDisplayProps> = ({ user, onEdit }) => {
  const getStatusBadge = (status: string) => {
    return (
      <Badge className={status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Thông tin User</h3>
        <Button 
          onClick={onEdit}
          variant="outline"
          size="sm"
          className="border-pink-200 text-pink-700 hover:bg-pink-50 dark:border-pink-700 dark:text-pink-300 dark:hover:bg-pink-900/20"
        >
          <Edit className="h-4 w-4 mr-2" />
          Chỉnh sửa
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <Label className="text-sm font-medium">User ID</Label>
          <p className="text-sm">{user.userId}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Tên</Label>
          <p className="text-sm">{user.name}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Điện thoại</Label>
          <p className="text-sm">{user.phone}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Email</Label>
          <p className="text-sm">{user.email}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Trạng thái</Label>
          <p className="text-sm">{getStatusBadge(user.status)}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Số dư</Label>
          <p className="text-sm">{user.balance} VND</p>
        </div>
        <div>
          <Label className="text-sm font-medium">KYC Level</Label>
          <p className="text-sm">{user.kycLevel}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoDisplay;
export type { User };
