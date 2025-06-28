
import React from 'react';
import { Card } from '@/components/ui/card';
import ServiceCard from './ServiceCard';
import { Service } from '@/types/k8s';

interface ServicesListProps {
  filteredServices: Service[];
  expandedService: string | null;
  onToggleExpansion: (serviceName: string) => void;
  onRestartService: (serviceName: string, reason: string) => void;
  onStopService: (serviceName: string, reason: string) => void;
  onScaleService: (serviceName: string, newReplicas: number, reason: string) => void;
  onViewLogs: (podName: string) => void;
  onDeletePod: (podName: string) => void;
  onDeleteService: (serviceName: string, reason: string) => void;
}

const ServicesList: React.FC<ServicesListProps> = ({
  filteredServices,
  expandedService,
  onToggleExpansion,
  onRestartService,
  onStopService,
  onScaleService,
  onViewLogs,
  onDeletePod,
  onDeleteService
}) => {
  return (
    <div className="space-y-4">
      {filteredServices.map((service) => (
        <ServiceCard
          key={service.name}
          service={service}
          isExpanded={expandedService === service.name}
          onToggleExpansion={() => onToggleExpansion(service.name)}
          onRestartService={onRestartService}
          onStopService={onStopService}
          onScaleService={onScaleService}
          onViewLogs={onViewLogs}
          onDeletePod={onDeletePod}
          onDeleteService={onDeleteService}
        />
      ))}
      
      {filteredServices.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No services found matching current filters.</p>
        </Card>
      )}
    </div>
  );
};

export default ServicesList;
