
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Database, Phone, User, Mail } from 'lucide-react';
import { toast } from 'sonner';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [searchType, setSearchType] = useState('phone');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const databases = [
    { id: 'user_db', name: 'User Database', description: 'Main user information' },
    { id: 'transaction_db', name: 'Transaction Database', description: 'Transaction history' },
    { id: 'kyc_db', name: 'KYC Database', description: 'KYC verification data' },
    { id: 'wallet_db', name: 'Wallet Database', description: 'Wallet and balance info' },
    { id: 'audit_db', name: 'Audit Database', description: 'User activity logs' }
  ];

  const mockSearchResults = [
    {
      id: '1',
      phone: '0123456789',
      email: 'user1@example.com',
      name: 'Nguyen Van A',
      status: 'active',
      balance: '1,500,000',
      lastLogin: '2024-01-15 10:30:00',
      kycStatus: 'verified'
    },
    {
      id: '2',
      phone: '0987654321',
      email: 'user2@example.com',
      name: 'Tran Thi B',
      status: 'suspended',
      balance: '500,000',
      lastLogin: '2024-01-14 15:45:00',
      kycStatus: 'pending'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Vui lòng nhập thông tin tìm kiếm');
      return;
    }
    
    if (!selectedDatabase) {
      toast.error('Vui lòng chọn database');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockSearchResults);
      setIsLoading(false);
      toast.success(`Tìm thấy ${mockSearchResults.length} kết quả trong ${databases.find(db => db.id === selectedDatabase)?.name}`);
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-500',
      suspended: 'bg-red-500',
      pending: 'bg-yellow-500'
    };
    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400">User Search</h1>
      </div>
      
      <Card className="border-pink-100 dark:border-pink-800/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Tìm kiếm thông tin User
          </CardTitle>
          <CardDescription>
            Tìm kiếm thông tin user theo số điện thoại, email hoặc ID trong các database khác nhau
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Loại tìm kiếm</Label>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Số điện thoại
                    </div>
                  </SelectItem>
                  <SelectItem value="email">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                  </SelectItem>
                  <SelectItem value="userId">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      User ID
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Database</Label>
              <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn database" />
                </SelectTrigger>
                <SelectContent>
                  {databases.map((db) => (
                    <SelectItem key={db.id} value={db.id}>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{db.name}</div>
                          <div className="text-xs text-muted-foreground">{db.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Thông tin tìm kiếm</Label>
              <div className="flex gap-2">
                <Input
                  placeholder={`Nhập ${searchType === 'phone' ? 'số điện thoại' : searchType === 'email' ? 'email' : 'User ID'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  onClick={handleSearch} 
                  disabled={isLoading}
                  className="pink-gradient text-white"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {searchResults.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Kết quả tìm kiếm</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Điện thoại</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Số dư</TableHead>
                    <TableHead>KYC</TableHead>
                    <TableHead>Đăng nhập cuối</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.balance} VND</TableCell>
                      <TableCell>{getStatusBadge(user.kycStatus)}</TableCell>
                      <TableCell className="text-sm">{user.lastLogin}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSearch;
