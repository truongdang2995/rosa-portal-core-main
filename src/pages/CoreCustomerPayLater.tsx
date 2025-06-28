
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Banknote } from 'lucide-react';

const CoreCustomerPayLater = () => {
  const { user } = useAuth();
  const hasPermission = user?.permissions.includes('core-paylater') || false;

  if (!hasPermission) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Access Denied</h2>
          <p className="text-gray-500">You don't have permission to access User Core PayLater.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Banknote className="h-8 w-8 text-pink-600" />
        <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400">User Core PayLater</h1>
      </div>
      
      <Card className="border-pink-100 dark:border-pink-800/30">
        <CardHeader>
          <CardTitle>PayLater User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            This page will contain PayLater user core information and management features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoreCustomerPayLater;
