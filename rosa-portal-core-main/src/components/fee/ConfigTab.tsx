
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Settings, FileJson, Save, Plus, Edit, Trash2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

export const ConfigTab = () => {
  const [selectedFeeType, setSelectedFeeType] = useState<string>('');
  const [configMode, setConfigMode] = useState<'flexible' | 'fixed'>('fixed');
  const [jsonConfig, setJsonConfig] = useState('{\n  "agents": {\n    "AGENT001": {\n      "type": "percentage",\n      "value": 0.5,\n      "minFee": 1000,\n      "maxFee": 50000\n    }\n  }\n}');
  const [editingConfig, setEditingConfig] = useState<string | null>(null);

  const feeTypes = [
    { id: 'fee-dv', label: 'Fee DV', color: 'bg-blue-500' },
    { id: 'fee-247', label: 'Fee 247', color: 'bg-green-500' },
    { id: 'fee-mc', label: 'Fee MC', color: 'bg-purple-500' }
  ];

  // Mock data for different fee types
  const mockConfigs = {
    'fee-dv': [
      {
        id: '1',
        agent: 'AGENT001',
        type: 'percentage',
        value: '0.5',
        minFee: '1000',
        maxFee: '50000',
        status: 'active'
      },
      {
        id: '2',
        agent: 'AGENT002',
        type: 'fixed',
        value: '5000',
        minFee: '5000',
        maxFee: '5000',
        status: 'active'
      }
    ],
    'fee-247': [
      {
        id: '3',
        agent: 'AGENT003',
        type: 'percentage',
        value: '0.3',
        minFee: '500',
        maxFee: '30000',
        status: 'active'
      }
    ],
    'fee-mc': [
      {
        id: '4',
        agent: 'AGENT004',
        type: 'fixed',
        value: '2000',
        minFee: '2000',
        maxFee: '2000',
        status: 'active'
      }
    ]
  };

  const [fixedConfigs, setFixedConfigs] = useState(mockConfigs);

  const [newConfig, setNewConfig] = useState({
    agent: '',
    type: 'percentage',
    value: '',
    minFee: '',
    maxFee: '',
    status: 'active'
  });

  const selectedFeeTypeLabel = feeTypes.find(type => type.id === selectedFeeType)?.label || 'Chọn loại Fee';
  const currentConfigs = selectedFeeType ? fixedConfigs[selectedFeeType as keyof typeof fixedConfigs] || [] : [];

  const handleSaveJson = () => {
    if (!selectedFeeType) {
      toast.error('Vui lòng chọn loại fee trước');
      return;
    }
    try {
      JSON.parse(jsonConfig);
      toast.success(`Cấu hình JSON cho ${selectedFeeTypeLabel} đã được lưu thành công`);
    } catch (error) {
      toast.error('JSON không hợp lệ. Vui lòng kiểm tra lại.');
    }
  };

  const handleAddConfig = () => {
    if (!selectedFeeType) {
      toast.error('Vui lòng chọn loại fee trước');
      return;
    }
    if (!newConfig.agent || !newConfig.value) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const config = {
      id: Date.now().toString(),
      ...newConfig
    };

    setFixedConfigs(prev => ({
      ...prev,
      [selectedFeeType]: [...(prev[selectedFeeType as keyof typeof prev] || []), config]
    }));
    setNewConfig({
      agent: '',
      type: 'percentage',
      value: '',
      minFee: '',
      maxFee: '',
      status: 'active'
    });
    toast.success(`Thêm cấu hình cho ${selectedFeeTypeLabel} thành công`);
  };

  const handleEditConfig = (configId: string) => {
    setEditingConfig(configId);
  };

  const handleSaveConfig = (configId: string) => {
    setEditingConfig(null);
    toast.success('Cập nhật cấu hình thành công');
  };

  const handleDeleteConfig = (configId: string) => {
    if (!selectedFeeType) return;
    
    setFixedConfigs(prev => ({
      ...prev,
      [selectedFeeType]: prev[selectedFeeType as keyof typeof prev]?.filter(config => config.id !== configId) || []
    }));
    toast.success('Xóa cấu hình thành công');
  };

  const handleConfigChange = (configId: string, field: string, value: string) => {
    if (!selectedFeeType) return;
    
    setFixedConfigs(prev => ({
      ...prev,
      [selectedFeeType]: prev[selectedFeeType as keyof typeof prev]?.map(config => 
        config.id === configId ? { ...config, [field]: value } : config
      ) || []
    }));
  };

  return (
    <div className="space-y-6">
      {/* Fee Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Chọn loại Fee để cấu hình</CardTitle>
          <CardDescription>
            Chọn loại fee mà bạn muốn cấu hình
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
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
        </CardContent>
      </Card>

      {selectedFeeType && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Cấu hình phí cho {selectedFeeTypeLabel}
              </CardTitle>
              <CardDescription>
                Chọn phương thức cấu hình phí: Flexible (JSON) hoặc Cố định (Form)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={configMode} onValueChange={(value: 'flexible' | 'fixed') => setConfigMode(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flexible" id="flexible" />
                  <Label htmlFor="flexible" className="flex items-center gap-2">
                    <FileJson className="h-4 w-4" />
                    Flexible (JSON Config)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Cố định (Form Config)
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {configMode === 'flexible' && (
            <Card>
              <CardHeader>
                <CardTitle>JSON Configuration cho {selectedFeeTypeLabel}</CardTitle>
                <CardDescription>
                  Nhập cấu hình phí dưới dạng JSON cho {selectedFeeTypeLabel}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>JSON Config</Label>
                  <textarea
                    className="w-full h-64 p-3 border rounded-md font-mono text-sm"
                    value={jsonConfig}
                    onChange={(e) => setJsonConfig(e.target.value)}
                    placeholder="Nhập cấu hình JSON..."
                  />
                </div>
                <Button onClick={handleSaveJson} className="bg-pink-500 hover:bg-pink-600 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu cấu hình JSON cho {selectedFeeTypeLabel}
                </Button>
              </CardContent>
            </Card>
          )}

          {configMode === 'fixed' && (
            <>
              {/* Add New Config */}
              <Card>
                <CardHeader>
                  <CardTitle>Thêm cấu hình mới cho {selectedFeeTypeLabel}</CardTitle>
                  <CardDescription>
                    Điền thông tin để thêm cấu hình phí mới cho {selectedFeeTypeLabel}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Mã Agent</Label>
                      <Input
                        placeholder="Mã Agent"
                        value={newConfig.agent}
                        onChange={(e) => setNewConfig(prev => ({ ...prev, agent: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Loại phí</Label>
                      <Select value={newConfig.type} onValueChange={(value) => setNewConfig(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Giá trị</Label>
                      <Input
                        placeholder="Giá trị phí"
                        value={newConfig.value}
                        onChange={(e) => setNewConfig(prev => ({ ...prev, value: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phí tối thiểu</Label>
                      <Input
                        placeholder="Min fee"
                        value={newConfig.minFee}
                        onChange={(e) => setNewConfig(prev => ({ ...prev, minFee: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phí tối đa</Label>
                      <Input
                        placeholder="Max fee"
                        value={newConfig.maxFee}
                        onChange={(e) => setNewConfig(prev => ({ ...prev, maxFee: e.target.value }))}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddConfig} className="bg-pink-500 hover:bg-pink-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm cấu hình cho {selectedFeeTypeLabel}
                  </Button>
                </CardContent>
              </Card>

              {/* Current Configs */}
              <Card>
                <CardHeader>
                  <CardTitle>Cấu hình hiện tại cho {selectedFeeTypeLabel}</CardTitle>
                  <CardDescription>
                    Quản lý các cấu hình phí hiện có cho {selectedFeeTypeLabel} ({currentConfigs.length} cấu hình)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {currentConfigs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Chưa có cấu hình nào cho {selectedFeeTypeLabel}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mã Agent</TableHead>
                          <TableHead>Loại phí</TableHead>
                          <TableHead>Giá trị</TableHead>
                          <TableHead>Phí tối thiểu</TableHead>
                          <TableHead>Phí tối đa</TableHead>
                          <TableHead>Trạng thái</TableHead>
                          <TableHead>Thao tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentConfigs.map((config) => (
                          <TableRow key={config.id}>
                            <TableCell className="font-medium">{config.agent}</TableCell>
                            <TableCell>
                              {editingConfig === config.id ? (
                                <Select 
                                  value={config.type} 
                                  onValueChange={(value) => handleConfigChange(config.id, 'type', value)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                    <SelectItem value="fixed">Fixed</SelectItem>
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Badge variant="outline">{config.type}</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingConfig === config.id ? (
                                <Input 
                                  value={config.value}
                                  onChange={(e) => handleConfigChange(config.id, 'value', e.target.value)}
                                  className="w-20"
                                />
                              ) : (
                                `${config.value}${config.type === 'percentage' ? '%' : ' VND'}`
                              )}
                            </TableCell>
                            <TableCell>
                              {editingConfig === config.id ? (
                                <Input 
                                  value={config.minFee}
                                  onChange={(e) => handleConfigChange(config.id, 'minFee', e.target.value)}
                                  className="w-24"
                                />
                              ) : (
                                `${config.minFee} VND`
                              )}
                            </TableCell>
                            <TableCell>
                              {editingConfig === config.id ? (
                                <Input 
                                  value={config.maxFee}
                                  onChange={(e) => handleConfigChange(config.id, 'maxFee', e.target.value)}
                                  className="w-24"
                                />
                              ) : (
                                `${config.maxFee} VND`
                              )}
                            </TableCell>
                            <TableCell>
                              {editingConfig === config.id ? (
                                <Switch 
                                  checked={config.status === 'active'}
                                  onCheckedChange={(checked) => 
                                    handleConfigChange(config.id, 'status', checked ? 'active' : 'inactive')
                                  }
                                />
                              ) : (
                                <Badge className={config.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                                  {config.status}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingConfig === config.id ? (
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleSaveConfig(config.id)}
                                    className="bg-pink-500 hover:bg-pink-600 text-white"
                                  >
                                    <Save className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => setEditingConfig(null)}
                                  >
                                    Hủy
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => handleEditConfig(config.id)}
                                    className="text-pink-600 hover:bg-pink-50"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => handleDeleteConfig(config.id)}
                                    className="text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
};
