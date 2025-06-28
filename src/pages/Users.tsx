
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { MoreHorizontal, UserPlus, Edit, Trash2, Eye } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock user data with more details
const mockUsers = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    role: 'admin', 
    authMethod: 'LDAP', 
    status: 'active',
    lastLogin: '2024-01-15 10:30:00',
    department: 'IT',
    createdAt: '2023-06-01'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    role: 'user', 
    authMethod: 'LOCAL', 
    status: 'active',
    lastLogin: '2024-01-14 15:45:00',
    department: 'Marketing',
    createdAt: '2023-08-15'
  },
  { 
    id: '3', 
    name: 'Mike Johnson', 
    email: 'mike.johnson@example.com', 
    role: 'developer', 
    authMethod: 'G-Suite', 
    status: 'active',
    lastLogin: '2024-01-15 09:15:00',
    department: 'Engineering',
    createdAt: '2023-03-20'
  },
  { 
    id: '4', 
    name: 'Sara Brown', 
    email: 'sara.brown@example.com', 
    role: 'viewer', 
    authMethod: 'LDAP', 
    status: 'inactive',
    lastLogin: '2024-01-10 11:20:00',
    department: 'HR',
    createdAt: '2023-09-10'
  },
  { 
    id: '5', 
    name: 'David Wilson', 
    email: 'david.wilson@example.com', 
    role: 'admin', 
    authMethod: 'LOCAL', 
    status: 'active',
    lastLogin: '2024-01-15 08:00:00',
    department: 'Operations',
    createdAt: '2023-01-05'
  },
];

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');

  // Filter users based on search query and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleSaveUser = () => {
    toast.success(`User ${selectedUser?.name} updated successfully`);
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    toast.success(`User ${selectedUser?.name} deleted successfully`);
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        variant={status === 'active' ? 'default' : 'secondary'}
        className={status === 'active' ? 'bg-green-500 hover:bg-green-600' : ''}
      >
        {status}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-500 hover:bg-red-600',
      developer: 'bg-blue-500 hover:bg-blue-600',
      user: 'bg-gray-500 hover:bg-gray-600',
      viewer: 'bg-yellow-500 hover:bg-yellow-600'
    };
    
    return (
      <Badge className={colors[role as keyof typeof colors] || 'bg-gray-500'}>
        {role}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400">Users Management</h1>
        <Button className="pink-gradient text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>
      
      <Card className="border-pink-100 dark:border-pink-800/30">
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>Manage user accounts, view details, and update user information</CardDescription>
          
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex-1">
              <Input
                placeholder="Search users by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Auth Method</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.authMethod}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(user.lastLogin).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewUser(user)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>

      {/* View User Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>View complete user information</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm">{selectedUser.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{selectedUser.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Department</Label>
                  <p className="text-sm">{selectedUser.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Role</Label>
                  <p className="text-sm">{selectedUser.role}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <p className="text-sm">{selectedUser.status}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Auth Method</Label>
                  <p className="text-sm">{selectedUser.authMethod}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p className="text-sm">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Login</Label>
                  <p className="text-sm">{new Date(selectedUser.lastLogin).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input defaultValue={selectedUser.name} />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input defaultValue={selectedUser.email} />
              </div>
              <div className="grid gap-2">
                <Label>Department</Label>
                <Input defaultValue={selectedUser.department} />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveUser} className="pink-gradient text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
