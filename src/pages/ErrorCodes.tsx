
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Search, Edit, Trash2, AlertTriangle, Upload } from 'lucide-react';

const ErrorCodes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [bulkAddDialogOpen, setBulkAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedErrorCode, setSelectedErrorCode] = useState<any>(null);

  const [newErrorCode, setNewErrorCode] = useState({
    code: '',
    message: '',
    category: '',
    severity: 'medium'
  });

  const [bulkErrorCodes, setBulkErrorCodes] = useState('');

  const mockErrorCodes = [
    {
      id: '1',
      code: 'E001',
      message: 'Insufficient balance',
      category: 'payment',
      severity: 'high',
      status: 'active',
      createdAt: '2024-01-01',
      createdBy: 'admin'
    },
    {
      id: '2',
      code: 'E002',
      message: 'Invalid phone number format',
      category: 'validation',
      severity: 'medium',
      status: 'active',
      createdAt: '2024-01-02',
      createdBy: 'admin'
    },
    {
      id: '3',
      code: 'E003',
      message: 'Account temporarily locked',
      category: 'security',
      severity: 'high',
      status: 'active',
      createdAt: '2024-01-03',
      createdBy: 'admin'
    }
  ];

  const categories = [
    { value: 'payment', label: 'Payment' },
    { value: 'validation', label: 'Validation' },
    { value: 'security', label: 'Security' },
    { value: 'system', label: 'System' },
    { value: 'network', label: 'Network' }
  ];

  const filteredErrorCodes = mockErrorCodes.filter(errorCode => {
    const matchesSearch = errorCode.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         errorCode.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || errorCode.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddErrorCode = () => {
    if (!newErrorCode.code || !newErrorCode.message || !newErrorCode.category) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    
    toast.success('Thêm mã lỗi thành công');
    setAddDialogOpen(false);
    setNewErrorCode({ code: '', message: '', category: '', severity: 'medium' });
  };

  const handleBulkAdd = () => {
    if (!bulkErrorCodes.trim()) {
      toast.error('Vui lòng nhập danh sách mã lỗi');
      return;
    }
    
    const lines = bulkErrorCodes.split('\n').filter(line => line.trim());
    toast.success(`Đã thêm ${lines.length} mã lỗi thành công`);
    setBulkAddDialogOpen(false);
    setBulkErrorCodes('');
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      low: 'bg-green-500',
      medium: 'bg-yellow-500',
      high: 'bg-red-500'
    };
    return (
      <Badge className={colors[severity as keyof typeof colors]}>
        {severity}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400">Error Codes Management</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setBulkAddDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Bulk Add
          </Button>
          <Button 
            onClick={() => setAddDialogOpen(true)}
            className="pink-gradient text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Error Code
          </Button>
        </div>
      </div>
      
      <Card className="border-pink-100 dark:border-pink-800/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Quản lý mã lỗi hệ thống
          </CardTitle>
          <CardDescription>
            Thêm, sửa, xóa các mã lỗi mà hệ thống core đang chặn
          </CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm theo mã lỗi hoặc thông báo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã lỗi</TableHead>
                <TableHead>Thông báo</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Mức độ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredErrorCodes.map((errorCode) => (
                <TableRow key={errorCode.id}>
                  <TableCell className="font-medium">{errorCode.code}</TableCell>
                  <TableCell>{errorCode.message}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{errorCode.category}</Badge>
                  </TableCell>
                  <TableCell>{getSeverityBadge(errorCode.severity)}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">{errorCode.status}</Badge>
                  </TableCell>
                  <TableCell>{errorCode.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedErrorCode(errorCode);
                          setEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredErrorCodes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Không tìm thấy mã lỗi nào phù hợp
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Error Code Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm mã lỗi mới</DialogTitle>
            <DialogDescription>Nhập thông tin mã lỗi cần thêm vào hệ thống</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Mã lỗi</Label>
              <Input 
                placeholder="E001"
                value={newErrorCode.code}
                onChange={(e) => setNewErrorCode({...newErrorCode, code: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label>Thông báo lỗi</Label>
              <Input 
                placeholder="Mô tả lỗi"
                value={newErrorCode.message}
                onChange={(e) => setNewErrorCode({...newErrorCode, message: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label>Danh mục</Label>
              <Select value={newErrorCode.category} onValueChange={(value) => setNewErrorCode({...newErrorCode, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Mức độ nghiêm trọng</Label>
              <Select value={newErrorCode.severity} onValueChange={(value) => setNewErrorCode({...newErrorCode, severity: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddErrorCode} className="pink-gradient text-white">
              Thêm mã lỗi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Add Dialog */}
      <Dialog open={bulkAddDialogOpen} onOpenChange={setBulkAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm hàng loạt mã lỗi</DialogTitle>
            <DialogDescription>
              Nhập danh sách mã lỗi, mỗi dòng một mã theo format: CODE|Message|Category|Severity
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Danh sách mã lỗi</Label>
              <Textarea 
                placeholder="E001|Insufficient balance|payment|high&#10;E002|Invalid format|validation|medium"
                rows={10}
                value={bulkErrorCodes}
                onChange={(e) => setBulkErrorCodes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleBulkAdd} className="pink-gradient text-white">
              Thêm hàng loạt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ErrorCodes;
