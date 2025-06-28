
import React from 'react';
import { SidebarNav } from './SidebarNav';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';

export const AppLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const handleLogout = () => {
    logout();
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return '';
    const nameParts = user.username.split(' ');
    if (nameParts.length === 1) return nameParts[0].substring(0, 2).toUpperCase();
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SidebarNav />
        <div className="flex-1 overflow-auto">
          <div className="border-b bg-background p-4">
            <div className="flex items-center justify-between">
              <SidebarTrigger />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 outline-none">
                    <span className="text-sm font-medium hidden md:inline-block">
                      {user?.username || 'User'}
                    </span>
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src="" alt={user?.username || 'User'} />
                      <AvatarFallback className="bg-pink-100 text-pink-700">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100">
                      <User className="h-4 w-4 text-pink-700" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{user?.username || 'User'}</p>
                      <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex gap-2 cursor-pointer text-pink-700" 
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
