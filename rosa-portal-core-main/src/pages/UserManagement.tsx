
import React, { useState } from 'react';
import { toast } from 'sonner';
import UserSearchForm, { databases } from '@/components/user-management/UserSearchForm';
import UserInfoDisplay, { User } from '@/components/user-management/UserInfoDisplay';
import UserEditDialog from '@/components/user-management/UserEditDialog';

const UserManagement = () => {
  const [userEditDialogOpen, setUserEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchType, setSearchType] = useState('agent_id');
  const [searchValue, setSearchValue] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState('');

  const [userInfo, setUserInfo] = useState({
    userId: '',
    name: '',
    phone: '',
    email: '',
    status: '',
    balance: '',
    kycLevel: ''
  });

  const handleUserSearch = () => {
    if (!searchValue.trim()) {
      toast.error('Vui lòng nhập thông tin tìm kiếm');
      return;
    }
    
    if (!selectedDatabase) {
      toast.error('Vui lòng chọn database');
      return;
    }

    // Mock search user
    const mockUser = {
      userId: 'U123456',
      name: 'Nguyen Van A',
      phone: '0123456789',
      email: 'user@example.com',
      status: 'active',
      balance: '1500000',
      kycLevel: 'level3'
    };

    setSelectedUser(mockUser);
    setUserInfo(mockUser);
    
    toast.success(`Tìm thấy user trong ${databases.find(db => db.id === selectedDatabase)?.name}`);
  };

  const handleUpdateUser = () => {
    toast.success('Cập nhật thông tin user thành công');
    setUserEditDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400">User Management</h1>
      </div>
      
      <UserSearchForm
        searchType={searchType}
        setSearchType={setSearchType}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedDatabase={selectedDatabase}
        setSelectedDatabase={setSelectedDatabase}
        onSearch={handleUserSearch}
      />

      {selectedUser && (
        <UserInfoDisplay
          user={selectedUser}
          onEdit={() => setUserEditDialogOpen(true)}
        />
      )}

      <UserEditDialog
        open={userEditDialogOpen}
        onClose={() => setUserEditDialogOpen(false)}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default UserManagement;
