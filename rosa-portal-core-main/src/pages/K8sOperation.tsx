
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ServiceFilters from '@/components/k8s/ServiceFilters';
import ServicesList from '@/components/k8s/ServicesList';
import BulkActions from '@/components/k8s/BulkActions';
import { useAuth } from '@/contexts/AuthContext';
import { Service } from '@/types/k8s';
import { initialServices } from '@/data/k8sServices';
import {
  restartService,
  stopService,
  deleteService,
  scaleService,
  restartAllServices,
  stopAllServices,
  viewLogs,
  deletePod
} from '@/utils/k8sOperations';

const K8sOperation = () => {
  const { user } = useAuth();
  const [selectedNamespace, setSelectedNamespace] = useState('core');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>(initialServices);
  
  const namespaces = ['core', 'core-uat'];
  
  // Check user permissions
  const hasK8sPermission = user?.permissions.includes('k8s') || false;
  
  const filteredServices = services.filter(service => 
    (selectedNamespace === 'all' || service.namespace === selectedNamespace) &&
    (searchQuery === '' || service.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRestartService = async (serviceName: string, reason: string) => {
    await restartService(serviceName, reason, setServices);
  };
  
  const handleStopService = async (serviceName: string, reason: string) => {
    await stopService(serviceName, reason, setServices);
  };
  
  const handleDeleteService = async (serviceName: string, reason: string) => {
    await deleteService(serviceName, reason, setServices);
  };
  
  const handleScaleService = async (serviceName: string, newReplicas: number, reason: string) => {
    await scaleService(serviceName, newReplicas, reason, services, setServices);
  };
  
  const handleRestartAllServices = async (reason: string) => {
    await restartAllServices(selectedNamespace, filteredServices, setServices, reason);
  };
  
  const handleStopAllServices = async (reason: string) => {
    await stopAllServices(selectedNamespace, filteredServices, setServices, reason);
  };
  
  const handleViewLogs = (podName: string) => {
    viewLogs(podName);
  };

  const handleDeletePod = async (podName: string) => {
    await deletePod(podName, setServices);
  };

  const toggleServiceExpansion = (serviceName: string) => {
    setExpandedService(expandedService === serviceName ? null : serviceName);
  };

  if (!hasK8sPermission) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Access Denied</h2>
          <p className="text-gray-500">You don't have permission to access K8s Operations.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400">K8s Services Management</h1>
        <BulkActions
          selectedNamespace={selectedNamespace}
          filteredServicesCount={filteredServices.length}
          onRestartAll={handleRestartAllServices}
          onStopAll={handleStopAllServices}
        />
      </div>
      
      <Card className="border-pink-100 dark:border-pink-800/30">
        <CardHeader>
        </CardHeader>
        <CardContent>
          <ServiceFilters
            selectedNamespace={selectedNamespace}
            setSelectedNamespace={setSelectedNamespace}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            namespaces={namespaces}
          />
          
          <ServicesList
            filteredServices={filteredServices}
            expandedService={expandedService}
            onToggleExpansion={toggleServiceExpansion}
            onRestartService={handleRestartService}
            onStopService={handleStopService}
            onScaleService={handleScaleService}
            onViewLogs={handleViewLogs}
            onDeletePod={handleDeletePod}
            onDeleteService={handleDeleteService}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default K8sOperation;
