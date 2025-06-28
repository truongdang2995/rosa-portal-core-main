import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { FileIcon, SearchIcon, FilterIcon, FolderIcon, DownloadIcon, FileTextIcon, Trash2Icon, PencilIcon, PlusIcon, Upload } from 'lucide-react';

// Mock document data
const mockDocuments = [
  { 
    id: '1', 
    title: 'Kubernetes Deployment Guide', 
    category: 'Technical', 
    createdBy: 'John Doe', 
    createdAt: '2025-04-12', 
    size: '1.2 MB',
    tags: ['kubernetes', 'deployment', 'guide']
  },
  { 
    id: '2', 
    title: 'Project Documentation', 
    category: 'Project', 
    createdBy: 'Jane Smith', 
    createdAt: '2025-04-10', 
    size: '3.5 MB',
    tags: ['project', 'documentation']
  },
  { 
    id: '3', 
    title: 'API Specifications', 
    category: 'Technical', 
    createdBy: 'Mike Johnson', 
    createdAt: '2025-04-08', 
    size: '850 KB',
    tags: ['api', 'technical', 'specification']
  },
  { 
    id: '4', 
    title: 'Meeting Minutes - April 2025', 
    category: 'Meeting', 
    createdBy: 'Sara Brown', 
    createdAt: '2025-04-05', 
    size: '420 KB',
    tags: ['meeting', 'minutes']
  },
  { 
    id: '5', 
    title: 'Database Schema Design', 
    category: 'Technical', 
    createdBy: 'David Wilson', 
    createdAt: '2025-04-03', 
    size: '1.8 MB',
    tags: ['database', 'schema', 'design']
  },
  { 
    id: '6', 
    title: 'User Manual', 
    category: 'User Guide', 
    createdBy: 'John Doe', 
    createdAt: '2025-04-01', 
    size: '4.2 MB',
    tags: ['user', 'manual', 'guide']
  },
  { 
    id: '7', 
    title: 'Product Roadmap 2025', 
    category: 'Product', 
    createdBy: 'Jane Smith', 
    createdAt: '2025-03-28', 
    size: '980 KB',
    tags: ['product', 'roadmap', 'planning']
  },
  { 
    id: '8', 
    title: 'Security Guidelines', 
    category: 'Security', 
    createdBy: 'Mike Johnson', 
    createdAt: '2025-03-25', 
    size: '1.5 MB',
    tags: ['security', 'guidelines', 'policy']
  }
];

const documentCategories = ['All', 'Technical', 'Project', 'Meeting', 'User Guide', 'Product', 'Security'];

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [createDocDialogOpen, setCreateDocDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [viewDocumentDialogOpen, setViewDocumentDialogOpen] = useState(false);
  
  const [newDocument, setNewDocument] = useState({
    title: '',
    category: 'Technical',
    content: '',
    tags: ''
  });
  
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  
  // Filter documents based on search query and category
  const filteredDocuments = mockDocuments.filter(doc => 
    (searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) &&
    (selectedCategory === 'All' || doc.category === selectedCategory)
  );
  
  const handleUpload = () => {
    if (!uploadFile) {
      toast.error('Please select a file to upload');
      return;
    }
    
    toast.success(`File "${uploadFile.name}" uploaded successfully`);
    setUploadDialogOpen(false);
    setUploadFile(null);
  };
  
  const handleCreateDocument = () => {
    if (!newDocument.title || !newDocument.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success(`Document "${newDocument.title}" created successfully`);
    setCreateDocDialogOpen(false);
    setNewDocument({
      title: '',
      category: 'Technical',
      content: '',
      tags: ''
    });
  };
  
  const handleViewDocument = (doc: any) => {
    setSelectedDocument(doc);
    setViewDocumentDialogOpen(true);
  };
  
  const getDocumentIcon = (category: string) => {
    switch(category) {
      case 'Technical': return <FileTextIcon className="h-4 w-4 text-blue-500" />;
      case 'Project': return <FolderIcon className="h-4 w-4 text-green-500" />;
      case 'Meeting': return <FileIcon className="h-4 w-4 text-orange-500" />;
      case 'User Guide': return <FileIcon className="h-4 w-4 text-purple-500" />;
      case 'Product': return <FileIcon className="h-4 w-4 text-indigo-500" />;
      case 'Security': return <FileIcon className="h-4 w-4 text-red-500" />;
      default: return <FileIcon className="h-4 w-4 text-pink-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400">Documents</h1>
      
      <Card className="border-pink-100 dark:border-pink-800/30">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>Search, view and manage documents</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>
                      Upload a new document to the system
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="grid gap-2">
                      <Label htmlFor="file">Select File</Label>
                      <Input
                        id="file"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setUploadFile(e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select defaultValue="Technical">
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {documentCategories.filter(cat => cat !== 'All').map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input id="tags" placeholder="e.g. report, finance, 2025" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpload} className="pink-gradient text-white">
                      Upload Document
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog open={createDocDialogOpen} onOpenChange={setCreateDocDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="pink-gradient text-white flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" />
                    <span>Create</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Document</DialogTitle>
                    <DialogDescription>
                      Create a new document directly in the system
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Document title"
                        value={newDocument.title}
                        onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="doc-category">Category</Label>
                      <Select 
                        value={newDocument.category}
                        onValueChange={(value) => setNewDocument({...newDocument, category: value})}
                      >
                        <SelectTrigger id="doc-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {documentCategories.filter(cat => cat !== 'All').map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Enter document content here..."
                        className="min-h-[200px]"
                        value={newDocument.content}
                        onChange={(e) => setNewDocument({...newDocument, content: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="doc-tags">Tags (comma separated)</Label>
                      <Input 
                        id="doc-tags" 
                        placeholder="e.g. report, finance, 2025"
                        value={newDocument.tags}
                        onChange={(e) => setNewDocument({...newDocument, tags: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCreateDocDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateDocument} className="pink-gradient text-white">
                      Create Document
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="w-full md:w-[200px]">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {documentCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-pink-50 dark:bg-pink-900/20">
                    <th className="px-4 py-3 text-left font-medium">Title</th>
                    <th className="px-4 py-3 text-left font-medium">Category</th>
                    <th className="px-4 py-3 text-left font-medium">Created By</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-left font-medium">Size</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((doc, index) => (
                      <tr key={doc.id} className={`border-t ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-pink-50/50 dark:bg-pink-900/10'}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleViewDocument(doc)}>
                            {getDocumentIcon(doc.category)}
                            <span className="font-medium hover:text-pink-600 dark:hover:text-pink-400">{doc.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{doc.category}</td>
                        <td className="px-4 py-3">{doc.createdBy}</td>
                        <td className="px-4 py-3">{doc.createdAt}</td>
                        <td className="px-4 py-3">{doc.size}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0" 
                              onClick={() => handleViewDocument(doc)}
                            >
                              <FileIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-blue-600" 
                              onClick={() => toast.info(`Downloading ${doc.title}...`)}
                            >
                              <DownloadIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-orange-600" 
                              onClick={() => toast.info(`Edit mode for ${doc.title}`)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-red-600" 
                              onClick={() => toast.info(`Deleting ${doc.title}...`)}
                            >
                              <Trash2Icon className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        No documents found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Document Viewer Dialog */}
      <Dialog open={viewDocumentDialogOpen} onOpenChange={setViewDocumentDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
              {selectedDocument && getDocumentIcon(selectedDocument.category)}
              <DialogTitle>{selectedDocument?.title}</DialogTitle>
            </div>
            <DialogDescription>
              {selectedDocument?.category} • Created by {selectedDocument?.createdBy} on {selectedDocument?.createdAt}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[500px] rounded-md border p-4 bg-white dark:bg-gray-900">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Document Content</h3>
                <div className="text-sm text-muted-foreground">
                  {/* Mock content */}
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis nec magna feugiat tempus. 
                   Aenean ac ante vel leo sodales fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
                   posuere cubilia curae; Donec euismod eros vel elit faucibus, at feugiat nisl tempus. Sed aliquet augue eget 
                   risus bibendum, ac lobortis elit fermentum.</p>
                  <br />
                  <p>Suspendisse potenti. Mauris nec luctus ligula. Pellentesque quis turpis sed ipsum rhoncus vulputate. 
                   Mauris malesuada consectetur felis, id congue sem vestibulum et. Suspendisse sit amet auctor odio, 
                   in blandit enim. Integer at purus sit amet neque consequat pulvinar. Cras id feugiat nunc.</p>
                  <br />
                  <p>Curabitur vehicula aliquam ipsum, et sollicitudin metus facilisis at. Duis nec ultrices purus. 
                   Vivamus ullamcorper risus ac eleifend accumsan. Quisque consequat malesuada metus, a dapibus est 
                   iaculis vel. Nam accumsan erat nisi, sit amet fringilla arcu tincidunt id.</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDocument?.tags.map((tag: string, index: number) => (
                    <div key={index} className="bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 px-2 py-1 rounded-md text-xs">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <Button variant="outline" onClick={() => setViewDocumentDialogOpen(false)}>
                Close
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="text-orange-600">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Documents;
