
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronDown, Eye, RotateCcw, StopCircle, Trash, Trash2 } from 'lucide-react';
import ConfirmationDialog from './ConfirmationDialog';
import ScaleDialog from './ScaleDialog';

interface Pod {
  name: string;
  status: string;
  restarts: number;
  age: string;
  node: string;
  cpu: string;
  memory: string;
}

interface Service {
  name: string;
  namespace: string;
  replicas: number;
  maxReplicas: number;
  status: string;
  cpu: string;
  memory: string;
  pods: Pod[];
}

interface ServiceCardProps {
  service: Service;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onRestartService: (serviceName: string, reason: string) => void;
  onStopService: (serviceName: string, reason: string) => void;
  onScaleService: (serviceName: string, newReplicas: number, reason: string) => void;
  onViewLogs: (podName: string) => void;
  onDeletePod: (podName: string) => void;
  onDeleteService: (serviceName: string, reason: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isExpanded,
  onToggleExpansion,
  onRestartService,
  onStopService,
  onScaleService,
  onViewLogs,
  onDeletePod,
  onDeleteService
}) => {
  return (
    <Card className="border-l-4 border-l-pink-500 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpansion}
              className="p-1 h-8 w-8"
            >
              {isExpanded ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </Button>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {service.name}
                <Badge variant="outline" className="text-xs">
                  {service.namespace}
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span>Pods: {service.replicas}/{service.maxReplicas}</span>
                <span>CPU: {service.cpu}</span>
                <span>Memory: {service.memory}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={service.status === 'Running' ? 'default' : 'destructive'}
              className={service.status === 'Running' ? 'bg-green-500' : ''}>
              {service.status}
            </Badge>
            <div className="flex gap-1">
              <ConfirmationDialog
                trigger={
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <RotateCcw className="h-3 w-3" />
                    Restart
                  </Button>
                }
                title="Confirm restart service"
                description={`Are you sure you want to restart service ${service.name}? This will restart all ${service.replicas} pods and may cause temporary service disruption.`}
                onConfirm={(reason) => onRestartService(service.name, reason || '')}
                requireReason={true}
              />
              
              <ConfirmationDialog
                trigger={
                  <Button size="sm" variant="outline" className="flex items-center gap-1 text-orange-600 hover:text-orange-700">
                    <StopCircle className="h-3 w-3" />
                    Stop
                  </Button>
                }
                title="Confirm stop service"
                description={`Are you sure you want to stop service ${service.name}? This will stop all ${service.replicas} pods and make the service unavailable.`}
                onConfirm={(reason) => onStopService(service.name, reason || '')}
                confirmText="Confirm Stop"
                confirmButtonVariant="destructive"
                requireReason={true}
              />
              
              <ScaleDialog
                serviceName={service.name}
                currentReplicas={service.replicas}
                onConfirm={onScaleService}
              />
              
              <ConfirmationDialog
                trigger={
                  <Button size="sm" variant="outline" className="flex items-center gap-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300">
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                }
                title="Confirm delete service"
                description={`Are you sure you want to delete service ${service.name}? This action cannot be undone and will permanently remove the service and all its pods.`}
                onConfirm={(reason) => onDeleteService(service.name, reason || '')}
                confirmText="Confirm Delete"
                confirmButtonVariant="destructive"
                requireReason={true}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="rounded-md border overflow-hidden">
            <div className="bg-pink-50 dark:bg-pink-900/20 px-4 py-2 border-b">
              <h4 className="font-medium text-sm">Pod Details ({service.pods.length} pods)</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-4 py-2 text-left font-medium">Pod Name</th>
                    <th className="px-4 py-2 text-left font-medium">Status</th>
                    <th className="px-4 py-2 text-left font-medium">CPU</th>
                    <th className="px-4 py-2 text-left font-medium">Memory</th>
                    <th className="px-4 py-2 text-left font-medium">Restarts</th>
                    <th className="px-4 py-2 text-left font-medium">Age</th>
                    <th className="px-4 py-2 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {service.pods.map((pod, index) => (
                    <tr key={pod.name} className={`border-t ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-pink-50/50 dark:bg-pink-900/10'}`}>
                      <td className="px-4 py-2 font-mono text-xs">{pod.name}</td>
                      <td className="px-4 py-2">
                        <Badge variant={pod.status === 'Running' ? 'outline' : 'destructive'} 
                          className={pod.status === 'Running' ? 'border-green-500 text-green-600 dark:text-green-400' : ''}>
                          {pod.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">{pod.cpu}</td>
                      <td className="px-4 py-2">{pod.memory}</td>
                      <td className="px-4 py-2">{pod.restarts}</td>
                      <td className="px-4 py-2">{pod.age}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs flex items-center gap-1" 
                            onClick={() => onViewLogs(pod.name)}
                          >
                            <Eye className="h-3 w-3" />
                            Logs
                          </Button>
                          <ConfirmationDialog
                            trigger={
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs flex items-center gap-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                              >
                                <Trash className="h-3 w-3" />
                                Delete
                              </Button>
                            }
                            title="Confirm delete pod"
                            description={`Are you sure you want to delete pod ${pod.name}? The pod will be deleted and Kubernetes will create a new pod to replace it.`}
                            onConfirm={() => onDeletePod(pod.name)}
                            confirmText="Confirm Delete"
                            confirmButtonVariant="destructive"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ServiceCard;
