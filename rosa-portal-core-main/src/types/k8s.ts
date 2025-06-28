
export interface Pod {
  name: string;
  status: string;
  restarts: number;
  age: string;
  node: string;
  cpu: string;
  memory: string;
}

export interface Service {
  name: string;
  namespace: string;
  replicas: number;
  maxReplicas: number;
  status: string;
  cpu: string;
  memory: string;
  pods: Pod[];
}
