
import { Service } from '@/types/k8s';
import { toast } from 'sonner';
import { logAction } from '@/utils/k8sLogging';

// Simulate async operations like real systems
const simulateOperation = (duration: number = 2000) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

const generateNewPodName = (serviceName: string) => {
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  return `${serviceName}-${randomSuffix}`;
};

export const restartService = async (
  serviceName: string, 
  reason: string, 
  setServices: React.Dispatch<React.SetStateAction<Service[]>>
) => {
  // Show loading state
  setServices(prevServices => 
    prevServices.map(service => 
      service.name === serviceName 
        ? { ...service, status: 'Restarting' }
        : service
    )
  );

  toast.loading(`Restarting service ${serviceName}...`, { id: `restart-${serviceName}` });
  
  try {
    // Simulate restart process
    await simulateOperation(3000);
    
    // Update service with new pods
    setServices(prevServices => 
      prevServices.map(service => {
        if (service.name === serviceName) {
          const newPods = service.pods.map((pod, index) => ({
            ...pod,
            name: generateNewPodName(serviceName),
            restarts: pod.restarts + 1,
            age: '0m'
          }));
          
          return {
            ...service,
            status: 'Running',
            pods: newPods
          };
        }
        return service;
      })
    );

    logAction('RESTART_SERVICE', serviceName, `Service restarted successfully. Reason: ${reason}`);
    toast.success(`Service ${serviceName} restarted successfully!`, { id: `restart-${serviceName}` });
  } catch (error) {
    toast.error(`Failed to restart service ${serviceName}`, { id: `restart-${serviceName}` });
  }
};

export const stopService = async (
  serviceName: string, 
  reason: string, 
  setServices: React.Dispatch<React.SetStateAction<Service[]>>
) => {
  // Show loading state
  setServices(prevServices => 
    prevServices.map(service => 
      service.name === serviceName 
        ? { ...service, status: 'Stopping' }
        : service
    )
  );

  toast.loading(`Stopping service ${serviceName}...`, { id: `stop-${serviceName}` });
  
  try {
    await simulateOperation(2000);
    
    // Update service status to stopped
    setServices(prevServices => 
      prevServices.map(service => {
        if (service.name === serviceName) {
          const stoppedPods = service.pods.map(pod => ({
            ...pod,
            status: 'Terminated'
          }));
          
          return {
            ...service,
            status: 'Stopped',
            pods: stoppedPods
          };
        }
        return service;
      })
    );

    logAction('STOP_SERVICE', serviceName, `Service stopped successfully. Reason: ${reason}`);
    toast.success(`Service ${serviceName} stopped successfully!`, { id: `stop-${serviceName}` });
  } catch (error) {
    toast.error(`Failed to stop service ${serviceName}`, { id: `stop-${serviceName}` });
  }
};

export const deleteService = async (
  serviceName: string, 
  reason: string, 
  setServices: React.Dispatch<React.SetStateAction<Service[]>>
) => {
  toast.loading(`Deleting service ${serviceName}...`, { id: `delete-${serviceName}` });
  
  try {
    await simulateOperation(1500);
    
    setServices(prevServices => prevServices.filter(service => service.name !== serviceName));
    logAction('DELETE_SERVICE', serviceName, `Service deleted successfully. Reason: ${reason}`);
    toast.success(`Service ${serviceName} has been deleted!`, { id: `delete-${serviceName}` });
  } catch (error) {
    toast.error(`Failed to delete service ${serviceName}`, { id: `delete-${serviceName}` });
  }
};

export const scaleService = async (
  serviceName: string, 
  newReplicas: number, 
  reason: string, 
  services: Service[],
  setServices: React.Dispatch<React.SetStateAction<Service[]>>
) => {
  const currentService = services.find(s => s.name === serviceName);
  if (!currentService) return;
  
  const currentReplicas = currentService.replicas;
  
  toast.loading(`Scaling service ${serviceName} from ${currentReplicas} to ${newReplicas} replicas...`, { id: `scale-${serviceName}` });
  
  try {
    // Show scaling in progress
    setServices(prevServices => 
      prevServices.map(service => 
        service.name === serviceName 
          ? { ...service, status: 'Scaling' }
          : service
      )
    );

    await simulateOperation(2500);
    
    setServices(prevServices => 
      prevServices.map(service => {
        if (service.name === serviceName) {
          const newPods = [];
          
          for (let i = 0; i < newReplicas; i++) {
            newPods.push({
              name: generateNewPodName(serviceName),
              status: 'Running',
              restarts: 0,
              age: i < currentReplicas ? service.pods[i]?.age || '0m' : '0m',
              node: `node-${(i % 3) + 1}`,
              cpu: `${Math.floor(Math.random() * 15) + 5}%`,
              memory: `${Math.floor(Math.random() * 20) + 10}%`
            });
          }
          
          return {
            ...service,
            status: 'Running',
            replicas: newReplicas,
            maxReplicas: Math.max(newReplicas, service.maxReplicas),
            pods: newPods
          };
        }
        return service;
      })
    );
    
    logAction('SCALE_SERVICE', serviceName, `Scaling completed from ${currentReplicas} to ${newReplicas} replicas. Reason: ${reason}`);
    toast.success(`Service ${serviceName} scaled from ${currentReplicas} to ${newReplicas} replicas!`, { id: `scale-${serviceName}` });
  } catch (error) {
    toast.error(`Failed to scale service ${serviceName}`, { id: `scale-${serviceName}` });
  }
};

export const restartAllServices = async (
  selectedNamespace: string,
  filteredServices: Service[],
  setServices: React.Dispatch<React.SetStateAction<Service[]>>,
  reason: string
) => {
  const serviceNames = filteredServices.map(s => s.name);
  toast.loading(`Restarting all services in namespace ${selectedNamespace}...`, { id: 'restart-all' });
  
  try {
    await simulateOperation(4000);
    
    setServices(prevServices => 
      prevServices.map(service => {
        if (filteredServices.some(fs => fs.name === service.name)) {
          const newPods = service.pods.map(pod => ({
            ...pod,
            name: generateNewPodName(service.name),
            restarts: pod.restarts + 1,
            age: '0m'
          }));
          
          return {
            ...service,
            status: 'Running',
            pods: newPods
          };
        }
        return service;
      })
    );

    logAction('RESTART_ALL_SERVICES', `Namespace: ${selectedNamespace}`, `Services: ${serviceNames.join(', ')}. Reason: ${reason}`);
    toast.success(`All services in namespace ${selectedNamespace} restarted successfully!`, { id: 'restart-all' });
  } catch (error) {
    toast.error(`Failed to restart all services in namespace ${selectedNamespace}`, { id: 'restart-all' });
  }
};

export const stopAllServices = async (
  selectedNamespace: string,
  filteredServices: Service[],
  setServices: React.Dispatch<React.SetStateAction<Service[]>>,
  reason: string
) => {
  const serviceNames = filteredServices.map(s => s.name);
  toast.loading(`Stopping all services in namespace ${selectedNamespace}...`, { id: 'stop-all' });
  
  try {
    await simulateOperation(3000);
    
    setServices(prevServices => 
      prevServices.map(service => {
        if (filteredServices.some(fs => fs.name === service.name)) {
          const stoppedPods = service.pods.map(pod => ({
            ...pod,
            status: 'Terminated'
          }));
          
          return {
            ...service,
            status: 'Stopped',
            pods: stoppedPods
          };
        }
        return service;
      })
    );

    logAction('STOP_ALL_SERVICES', `Namespace: ${selectedNamespace}`, `Services: ${serviceNames.join(', ')}. Reason: ${reason}`);
    toast.success(`All services in namespace ${selectedNamespace} stopped successfully!`, { id: 'stop-all' });
  } catch (error) {
    toast.error(`Failed to stop all services in namespace ${selectedNamespace}`, { id: 'stop-all' });
  }
};

export const viewLogs = (podName: string) => {
  logAction('VIEW_LOGS', podName);
  toast.info(`Opening logs for pod ${podName}...`);
  // In a real system, this would open a log viewer
  setTimeout(() => {
    toast.success(`Logs for ${podName} opened in new window`);
  }, 1000);
};

export const deletePod = async (
  podName: string,
  setServices: React.Dispatch<React.SetStateAction<Service[]>>
) => {
  toast.loading(`Deleting pod ${podName}...`, { id: `delete-pod-${podName}` });
  
  try {
    await simulateOperation(1000);
    
    // Remove the pod and create a new one (Kubernetes behavior)
    setServices(prevServices => 
      prevServices.map(service => {
        const podIndex = service.pods.findIndex(pod => pod.name === podName);
        if (podIndex !== -1) {
          const newPods = [...service.pods];
          newPods[podIndex] = {
            ...newPods[podIndex],
            name: generateNewPodName(service.name),
            restarts: 0,
            age: '0m',
            status: 'Running'
          };
          
          return {
            ...service,
            pods: newPods
          };
        }
        return service;
      })
    );

    logAction('DELETE_POD', podName, 'Pod deleted and new pod created');
    toast.success(`Pod ${podName} deleted and replaced with new pod`, { id: `delete-pod-${podName}` });
  } catch (error) {
    toast.error(`Failed to delete pod ${podName}`, { id: `delete-pod-${podName}` });
  }
};
