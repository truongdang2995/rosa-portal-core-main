
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Download, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

export const ResearchTab = () => {
  const [selectedFeeType, setSelectedFeeType] = useState<string>('');
  const [agentCode, setAgentCode] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const feeTypes = [
    { id: 'fee-dv', label: 'Fee DV', color: 'bg-blue-500' },
    { id: 'fee-247', label: 'Fee 247', color: 'bg-green-500' },
    { id: 'fee-mc', label: 'Fee MC', color: 'bg-purple-500' }
  ];

  const handleSearch = async () => {
    if (!selectedFeeType) {
      toast.error('Vui lòng chọn loại fee');
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock search results
    const mockResults = [
      {
        id: '1',
        service: 'Transfer',
        feeType: selectedFeeType,
        value: '0.5%',
        minFee: '1,000 VND',
        maxFee: '50,000 VND',
        agent: agentCode || 'N/A',
        status: 'Active',
        lastUpdated: '2024-06-05'
      },
      {
        id: '2',
        service: 'Withdrawal',
        feeType: selectedFeeType,
        value: '5,000 VND',
        minFee: '5,000 VND',
        maxFee: '5,000 VND',
        agent: agentCode || 'N/A',
        status: 'Active',
        lastUpdated: '2024-06-04'
      }
    ];

    setSearchResults(mockResults);
    setIsSearching(false);
    toast.success('Tìm kiếm thành công');
  };

  const handleExport = () => {
    toast.success('Đang xuất dữ liệu...');
  };

  const selectedFeeTypeLabel = feeTypes.find(type => type.id === selectedFeeType)?.label || 'Chọn loại Fee';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm cấu hình phí</CardTitle>
          <CardDescription>
            Chọn loại fee và nhập mã agent để tìm kiếm cấu hình phí
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Top row with dropdowns and inputs */}
          <div className="flex gap-4 items-end">
            {/* Fee Type Dropdown */}
            <div className="space-y-2 flex-1">
              <Label>Loại Fee</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedFeeTypeLabel}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-white dark:bg-gray-800 z-50">
                  {feeTypes.map((type) => (
                    <DropdownMenuItem
                      key={type.id}
                      onClick={() => setSelectedFeeType(type.id)}
                      className="cursor-pointer"
                    >
                      <div className={`w-3 h-3 rounded-full ${type.color} mr-2`}></div>
                      {type.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Agent Input */}
            <div className="space-y-2 flex-1">
              <Label htmlFor="agent">Mã Agent (Tùy chọn)</Label>
              <Input
                id="agent"
                placeholder="Nhập mã agent..."
                value={agentCode}
                onChange={(e) => setAgentCode(e.target.value)}
              />
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch} 
              disabled={isSearching}
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Kết quả tìm kiếm</CardTitle>
                <CardDescription>
                  Tìm thấy {searchResults.length} kết quả cho {feeTypes.find(t => t.id === selectedFeeType)?.label}
                </CardDescription>
              </div>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Xuất Excel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dịch vụ</TableHead>
                  <TableHead>Loại Fee</TableHead>
                  <TableHead>Giá trị</TableHead>
                  <TableHead>Fee tối thiểu</TableHead>
                  <TableHead>Fee tối đa</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Cập nhật cuối</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.service}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{result.feeType}</Badge>
                    </TableCell>
                    <TableCell>{result.value}</TableCell>
                    <TableCell>{result.minFee}</TableCell>
                    <TableCell>{result.maxFee}</TableCell>
                    <TableCell>{result.agent}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{result.status}</Badge>
                    </TableCell>
                    <TableCell>{result.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
