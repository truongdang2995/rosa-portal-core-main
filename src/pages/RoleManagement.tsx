
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Mock user data
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'admin', authMethod: 'LDAP', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'user', authMethod: 'LOCAL', status: 'active' },
  { id: '3', name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'developer', authMethod: 'G-Suite', status: 'active' },
  { id: '4', name: 'Sara Brown', email: 'sara.brown@example.com', role: 'viewer', authMethod: 'LDAP', status: 'inactive' },
  { id: '5', name: 'David Wilson', email: 'david.wilson@example.com', role: 'admin', authMethod: 'LOCAL', status: 'active' },
];

// Mock permissions structure
const mockPermissions = {
  dashboard: {
    view: { id: 'dashboard.view', label: 'View Dashboard' },
    export: { id: 'dashboard.export', label: 'Export Dashboard Data' }
  },
  k8s: {
    view: { id: 'k8s.view', label: 'View K8s Resources' },
    manage: { id: 'k8s.manage', label: 'Manage K8s Resources' },
    delete: { id: 'k8s.delete', label: 'Delete K8s Resources' }
  },
  roles: {
    view: { id: 'roles.view', label: 'View Users & Roles' },
    edit: { id: 'roles.edit', label: 'Edit User Permissions' },
    create: { id: 'roles.create', label: 'Create New Users' }
  },
  documents: {
    view: { id: 'documents.view', label: 'View Documents' },
    create: { id: 'documents.create', label: 'Create Documents' },
    edit: { id: 'documents.edit', label: 'Edit Documents' },
    delete: { id: 'documents.delete', label: 'Delete Documents' }
  }
};

// Mock roles with their permissions
const mockRoles = {
  admin: Object.values(mockPermissions).flatMap(category => Object.values(category).map(perm => perm.id)),
  developer: [
    'dashboard.view', 'k8s.view', 'k8s.manage', 'documents.view', 
    'documents.create', 'documents.edit'
  ],
  user: ['dashboard.view', 'documents.view', 'documents.create'],
  viewer: ['dashboard.view', 'k8s.view', 'documents.view']
};

const RoleManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
  const [whitelistDialogOpen, setWhitelistDialogOpen] = useState(false);
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user',
    authMethod: 'LOCAL',
    password: '',
  });
  
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [whitelist, setWhitelist] = useState({
    email: '',
    domain: '',
    authMethod: 'LDAP',
  });
  
  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    // Load user's permissions based on their role
    setUserPermissions(mockRoles[user.role as keyof typeof mockRoles] || []);
  };
  
  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setUserPermissions(prev => [...prev, permissionId]);
    } else {
      setUserPermissions(prev => prev.filter(id => id !== permissionId));
    }
  };
  
  const handleSavePermissions = () => {
    toast.success('Permissions updated successfully');
    // In a real app, this would save to a backend
  };
  
  const handleCreateUser = () => {
    toast.success(`User ${newUser.name} created successfully`);
    setNewUserDialogOpen(false);
    // Reset form
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      authMethod: 'LOCAL',
      password: '',
    });
  };
  
  const handleAddWhitelist = () => {
    toast.success('Whitelist entry added successfully');
    setWhitelistDialogOpen(false);
    // Reset form
    setWhitelist({
      email: '',
      domain: '',
      authMethod: 'LDAP',
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400">Role & Permission Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User List */}
        <div className="lg:col-span-1">
          <Card className="h-full border-pink-100 dark:border-pink-800/30">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage users and their permissions</CardDescription>
              <div className="pt-2">
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setNewUserDialogOpen(true)}
                    className="pink-gradient text-white"
                  >
                    Add User
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setWhitelistDialogOpen(true)}
                  >
                    Whitelist
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div 
                      key={user.id}
                      className={`p-3 rounded-md cursor-pointer border transition-colors ${
                        selectedUser?.id === user.id
                          ? 'bg-pink-50 border-pink-300 dark:bg-pink-900/30 dark:border-pink-700'
                          : 'hover:bg-pink-50/50 dark:hover:bg-pink-900/20 border-transparent'
                      }`}
                      onClick={() => handleUserSelect(user)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge variant="outline" className="mb-1">{user.role}</Badge>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className={user.status === 'active' ? 'bg-green-500' : ''}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Auth: {user.authMethod}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No users found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* User Permissions */}
        <div className="lg:col-span-2">
          <Card className="h-full border-pink-100 dark:border-pink-800/30">
            <CardHeader>
              <CardTitle>
                {selectedUser ? `${selectedUser.name}'s Permissions` : 'User Permissions'}
              </CardTitle>
              <CardDescription>
                {selectedUser 
                  ? `Manage permissions for ${selectedUser.email}`
                  : 'Select a user to manage their permissions'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedUser ? (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <Label>User Role</Label>
                        <Select 
                          defaultValue={selectedUser.role}
                          onValueChange={(value) => {
                            setSelectedUser({...selectedUser, role: value});
                            // Update permissions based on role
                            setUserPermissions(mockRoles[value as keyof typeof mockRoles] || []);
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="developer">Developer</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Select 
                          defaultValue={selectedUser.status}
                          onValueChange={(value) => setSelectedUser({...selectedUser, status: value})}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                
                  <div className="space-y-6">
                    <Tabs defaultValue="dashboard">
                      <TabsList className="mb-4">
                        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                        <TabsTrigger value="k8s">K8s Operation</TabsTrigger>
                        <TabsTrigger value="roles">Role Management</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                      </TabsList>
                      
                      {Object.entries(mockPermissions).map(([category, permissions]) => (
                        <TabsContent key={category} value={category} className="space-y-4">
                          {Object.values(permissions).map((permission) => (
                            <div key={permission.id} className="flex items-start space-x-2">
                              <Checkbox
                                id={permission.id}
                                checked={userPermissions.includes(permission.id)}
                                onCheckedChange={(checked) => 
                                  handlePermissionChange(permission.id, checked as boolean)
                                }
                              />
                              <div className="grid gap-1.5 leading-none">
                                <Label
                                  htmlFor={permission.id}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {permission.label}
                                </Label>
                              </div>
                            </div>
                          ))}
                        </TabsContent>
                      ))}
                    </Tabs>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          // Reset to role-based permissions
                          setUserPermissions(mockRoles[selectedUser.role as keyof typeof mockRoles] || []);
                        }}
                      >
                        Reset
                      </Button>
                      <Button 
                        onClick={handleSavePermissions}
                        className="pink-gradient text-white"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  Select a user from the list to manage their permissions
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Add User Dialog */}
      <Dialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser({...newUser, role: value})}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="auth-method">Authentication Method</Label>
              <Select
                value={newUser.authMethod}
                onValueChange={(value) => setNewUser({...newUser, authMethod: value})}
              >
                <SelectTrigger id="auth-method">
                  <SelectValue placeholder="Select auth method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOCAL">Local</SelectItem>
                  <SelectItem value="LDAP">LDAP</SelectItem>
                  <SelectItem value="G-Suite">G-Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newUser.authMethod === 'LOCAL' && (
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="••••••••"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setNewUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateUser}
              className="pink-gradient text-white"
            >
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Whitelist Dialog */}
      <Dialog open={whitelistDialogOpen} onOpenChange={setWhitelistDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Whitelist Entry</DialogTitle>
            <DialogDescription>
              Add email addresses or domains to allow automatic access
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="whitelist-method">Authentication Method</Label>
              <Select
                value={whitelist.authMethod}
                onValueChange={(value) => setWhitelist({...whitelist, authMethod: value})}
              >
                <SelectTrigger id="whitelist-method">
                  <SelectValue placeholder="Select auth method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LDAP">LDAP</SelectItem>
                  <SelectItem value="G-Suite">G-Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="whitelist-type">Whitelist Type</Label>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="email">Email Address</TabsTrigger>
                  <TabsTrigger value="domain">Domain</TabsTrigger>
                </TabsList>
                <TabsContent value="email" className="pt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={whitelist.email}
                      onChange={(e) => setWhitelist({...whitelist, email: e.target.value})}
                      placeholder="user@example.com"
                    />
                    <p className="text-xs text-muted-foreground">
                      Add a specific email address to the whitelist
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="domain" className="pt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="domain">Domain</Label>
                    <Input
                      id="domain"
                      value={whitelist.domain}
                      onChange={(e) => setWhitelist({...whitelist, domain: e.target.value})}
                      placeholder="example.com"
                    />
                    <p className="text-xs text-muted-foreground">
                      Add all emails from a domain to the whitelist
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setWhitelistDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddWhitelist}
              className="pink-gradient text-white"
            >
              Add to Whitelist
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
