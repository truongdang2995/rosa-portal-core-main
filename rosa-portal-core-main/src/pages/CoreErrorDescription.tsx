import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  Upload, 
  Download, 
  Plus, 
  Edit3, 
  Trash2,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';

interface ErrorCode {
  id: string;
  code: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
}

const CoreErrorDescription = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingError, setEditingError] = useState<ErrorCode | null>(null);
  
  const [newError, setNewError] = useState({
    code: '',
    description: '',
    category: '',
    severity: 'medium' as 'low' | 'medium' | 'high' | 'critical'
  });

  // Mock data
  const [errorCodes, setErrorCodes] = useState<ErrorCode[]>([
    {
      id: '1',
      code: 'CORE_001',
      description: 'Invalid authentication token',
      category: 'Authentication',
      severity: 'high',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      code: 'CORE_002',
      description: 'Insufficient balance for transaction',
      category: 'Transaction',
      severity: 'medium',
      createdAt: '2024-01-16',
      updatedAt: '2024-01-16'
    },
    {
      id: '3',
      code: 'CORE_003',
      description: 'Database connection timeout',
      category: 'System',
      severity: 'critical',
      createdAt: '2024-01-17',
      updatedAt: '2024-01-17'
    }
  ]);

  const categories = ['all', 'Authentication', 'Transaction', 'System', 'Validation'];

  const hasPermission = user?.permissions.includes('core-error-desc') || false;

  const filteredErrors = errorCodes.filter(error => {
    const matchesSearch = error.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         error.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || error.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddError = () => {
    if (newError.code && newError.description && newError.category) {
      const errorCode: ErrorCode = {
        id: Date.now().toString(),
        ...newError,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setErrorCodes([...errorCodes, errorCode]);
      setNewError({ code: '', description: '', category: '', severity: 'medium' });
      setShowAddForm(false);
    }
  };

  const handleEditError = (error: ErrorCode) => {
    setEditingError(error);
    setNewError({
      code: error.code,
      description: error.description,
      category: error.category,
      severity: error.severity
    });
    setShowAddForm(true);
  };

  const handleUpdateError = () => {
    if (editingError && newError.code && newError.description && newError.category) {
      setErrorCodes(errorCodes.map(error => 
        error.id === editingError.id 
          ? { ...error, ...newError, updatedAt: new Date().toISOString().split('T')[0] }
          : error
      ));
      setEditingError(null);
      setNewError({ code: '', description: '', category: '', severity: 'medium' });
      setShowAddForm(false);
    }
  };

  const handleDeleteError = (id: string) => {
    setErrorCodes(errorCodes.filter(error => error.id !== id));
  };

  const handleImportFile = () => {
    // Implement file import logic
    console.log('Import file functionality');
  };

  const handleExportFile = () => {
    // Implement file export logic
    console.log('Export file functionality');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  if (!hasPermission) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Access Denied</h2>
          <p className="text-gray-500">You don't have permission to access Core Error Description.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400">Core Error Description</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImportFile} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExportFile} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700">
            <Plus className="h-4 w-4" />
            Add Error Code
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="border-pink-100 dark:border-pink-800/30">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Error Codes</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by error code or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="border-pink-100 dark:border-pink-800/30">
          <CardHeader>
            <CardTitle>{editingError ? 'Edit Error Code' : 'Add New Error Code'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">Error Code</Label>
                <Input
                  id="code"
                  value={newError.code}
                  onChange={(e) => setNewError({ ...newError, code: e.target.value })}
                  placeholder="e.g., CORE_004"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newError.category}
                  onChange={(e) => setNewError({ ...newError, category: e.target.value })}
                  placeholder="e.g., Authentication"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newError.description}
                onChange={(e) => setNewError({ ...newError, description: e.target.value })}
                placeholder="Describe the error..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="severity">Severity</Label>
              <select
                id="severity"
                value={newError.severity}
                onChange={(e) => setNewError({ ...newError, severity: e.target.value as any })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={editingError ? handleUpdateError : handleAddError} className="bg-pink-600 hover:bg-pink-700">
                {editingError ? 'Update' : 'Add'} Error Code
              </Button>
              <Button variant="outline" onClick={() => {
                setShowAddForm(false);
                setEditingError(null);
                setNewError({ code: '', description: '', category: '', severity: 'medium' });
              }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Codes List */}
      <Card className="border-pink-100 dark:border-pink-800/30">
        <CardHeader>
          <CardTitle>Error Codes ({filteredErrors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredErrors.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No error codes found matching your criteria</p>
              </div>
            ) : (
              filteredErrors.map((error) => (
                <div key={error.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
                          {error.code}
                        </code>
                        <Badge className={getSeverityColor(error.severity)}>
                          {error.severity}
                        </Badge>
                        <span className="text-sm text-gray-500">{error.category}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">{error.description}</p>
                      <div className="text-xs text-gray-500">
                        Created: {error.createdAt} | Updated: {error.updatedAt}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditError(error)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteError(error.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoreErrorDescription;
