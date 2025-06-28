
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Search, User, Phone, Database } from 'lucide-react';

interface UserSearchFormProps {
  searchType: string;
  setSearchType: (value: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedDatabase: string;
  setSelectedDatabase: (value: string) => void;
  onSearch: () => void;
}

const databases = [
  { id: 'vts', name: 'VTS Database', description: 'VTS user data' },
  { id: 'momo', name: 'MoMo Database', description: 'MoMo user data' },
  { id: 'invest', name: 'Invest Database', description: 'Investment user data' }
];

const UserSearchForm: React.FC<UserSearchFormProps> = ({
  searchType,
  setSearchType,
  searchValue,
  setSearchValue,
  selectedDatabase,
  setSelectedDatabase,
  onSearch
}) => {
  return (
    <Card className="border-pink-100 dark:border-pink-800/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Quản lý thông tin User
        </CardTitle>
        <CardDescription>
          Tìm kiếm và cập nhật thông tin người dùng
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
                <SelectItem value="agent_id">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Agent ID
                  </div>
                </SelectItem>
                <SelectItem value="phone_number">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Giá trị tìm kiếm</Label>
            <Input 
              placeholder={`Nhập ${searchType === 'agent_id' ? 'Agent ID' : 'số điện thoại'}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            />
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
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={onSearch} 
            className="bg-pink-500 hover:bg-pink-600 text-white dark:bg-pink-600 dark:hover:bg-pink-700"
          >
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm User
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSearchForm;
export { databases };
