
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

import { 
  LayoutDashboard, 
  Cloud, 
  UserCog, 
  LogOut,
  Users,
  DollarSign,
  Settings,
  AlertTriangle
} from 'lucide-react';

export const SidebarNav = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  
  const mainMenuItems = [
    {
      title: 'Dashboard',
      permission: 'dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
    },
  ];

  const userManagerItems = [
    {
      title: 'Users',
      permission: 'users',
      icon: Users,
      href: '/users',
    },
    {
      title: 'Role Management',
      permission: 'roles',
      icon: UserCog,
      href: '/role-management',
    },
  ];

  const coreManagerItems = [
    {
      title: 'K8s Operations',
      permission: 'k8s',
      icon: Cloud,
      href: '/k8s-operation',
    },
    {
      title: 'Fee Configuration',
      permission: 'fee-config',
      icon: DollarSign,
      href: '/fee-configuration',
    },
    {
      title: 'Core Error Description',
      permission: 'core-error-desc',
      icon: AlertTriangle,
      href: '/core-manager/error-description',
    },
    {
      title: 'User Management',
      permission: 'user-management',
      icon: Users,
      href: '/user-management',
    },
  ];

  const systemItems = [
    {
      title: 'Settings',
      permission: 'settings',
      icon: Settings,
      href: '/settings',
    },
  ];

  const handleLogout = () => {
    logout();
  };

  const renderMenuItems = (items: typeof mainMenuItems) => {
    return items.map((item) => {
      if (user?.permissions.includes(item.permission)) {
        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild>
              <Link 
                to={item.href} 
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.href 
                    ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300" 
                    : "hover:bg-pink-50 dark:hover:bg-pink-900/20"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      }
      return null;
    });
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-pink-600">Core Portal</h1>
            </div>
            
            {/* Collapsible Sections */}
            <div className="px-2">
              <Accordion type="multiple" className="w-full">
                {/* Main Section */}
                <AccordionItem value="main" className="border-none">
                  <AccordionTrigger className="text-sm font-medium text-sidebar-foreground/70 hover:no-underline py-2 px-2">
                    Main
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <SidebarMenu>
                      {renderMenuItems(mainMenuItems)}
                    </SidebarMenu>
                  </AccordionContent>
                </AccordionItem>

                {/* User Manager Section */}
                <AccordionItem value="user-manager" className="border-none">
                  <AccordionTrigger className="text-sm font-medium text-sidebar-foreground/70 hover:no-underline py-2 px-2">
                    User Manager
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <SidebarMenu>
                      {renderMenuItems(userManagerItems)}
                    </SidebarMenu>
                  </AccordionContent>
                </AccordionItem>

                {/* Core Manager Section */}
                <AccordionItem value="core-manager" className="border-none">
                  <AccordionTrigger className="text-sm font-medium text-sidebar-foreground/70 hover:no-underline py-2 px-2">
                    Core Manager
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <SidebarMenu>
                      {renderMenuItems(coreManagerItems)}
                    </SidebarMenu>
                  </AccordionContent>
                </AccordionItem>

                {/* System Section */}
                <AccordionItem value="system" className="border-none">
                  <AccordionTrigger className="text-sm font-medium text-sidebar-foreground/70 hover:no-underline py-2 px-2">
                    System
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <SidebarMenu>
                      {renderMenuItems(systemItems)}
                    </SidebarMenu>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          <div className="p-4">
            <Button 
              variant="outline"
              className="w-full flex items-center gap-2 text-pink-700 hover:bg-pink-50 dark:text-pink-300 dark:hover:bg-pink-900/20"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
