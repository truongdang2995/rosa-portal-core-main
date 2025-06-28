
export const logAction = (action: string, target: string, details?: string) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] K8s Operation: ${action} on ${target}${details ? ` - ${details}` : ''}`);
  
  const logEntry = {
    timestamp,
    action,
    target,
    details,
    user: 'current-user'
  };
  
  const existingLogs = JSON.parse(localStorage.getItem('k8s-operation-logs') || '[]');
  existingLogs.push(logEntry);
  localStorage.setItem('k8s-operation-logs', JSON.stringify(existingLogs.slice(-100)));
};
