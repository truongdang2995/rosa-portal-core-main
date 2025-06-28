
import { Service } from '@/types/k8s';

export const initialServices: Service[] = [
  // Core namespace services
  {
    name: 'paylater-checkbill',
    namespace: 'core',
    replicas: 5,
    maxReplicas: 5,
    status: 'Running',
    cpu: '45%',
    memory: '67%',
    pods: [
      { name: 'paylater-checkbill-9b47cb57f-4bq5s', status: 'Running', restarts: 0, age: '7d17h', node: 'node-1', cpu: '8%', memory: '12%' },
      { name: 'paylater-checkbill-9b47cb57f-6pdr', status: 'Running', restarts: 0, age: '7d17h', node: 'node-2', cpu: '9%', memory: '14%' },
      { name: 'paylater-checkbill-9b47cb57f-mpc2', status: 'Running', restarts: 0, age: '7d17h', node: 'node-3', cpu: '10%', memory: '13%' },
      { name: 'paylater-checkbill-9b47cb57f-vqh9', status: 'Running', restarts: 0, age: '7d17h', node: 'node-1', cpu: '8%', memory: '11%' },
      { name: 'paylater-checkbill-9b47cb57f-xwcvq', status: 'Running', restarts: 0, age: '7d17h', node: 'node-2', cpu: '10%', memory: '17%' }
    ]
  },
  {
    name: 'payment-gateway',
    namespace: 'core',
    replicas: 2,
    maxReplicas: 2,
    status: 'Running',
    cpu: '32%',
    memory: '54%',
    pods: [
      { name: 'payment-gateway-7f8d9c5b6-abc12', status: 'Running', restarts: 0, age: '5d12h', node: 'node-1', cpu: '15%', memory: '25%' },
      { name: 'payment-gateway-7f8d9c5b6-def34', status: 'Running', restarts: 1, age: '5d12h', node: 'node-3', cpu: '17%', memory: '29%' }
    ]
  },
  {
    name: 'invest-uat-default',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '15%',
    memory: '30%',
    pods: [
      { name: 'invest-uat-default-7ff4c4b794-g9gqm', status: 'Running', restarts: 0, age: '9d', node: 'node-1', cpu: '15%', memory: '30%' }
    ]
  },
  {
    name: 'mono-checkconfirm-uat',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '12%',
    memory: '25%',
    pods: [
      { name: 'mono-checkconfirm-uat-7f7ccbb537-fqm7f', status: 'Running', restarts: 0, age: '8d', node: 'node-2', cpu: '12%', memory: '25%' }
    ]
  },
  {
    name: 'mono-epass-uat-confirm',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '18%',
    memory: '35%',
    pods: [
      { name: 'mono-epass-uat-confirm-767dfff5b6-dv68x', status: 'Running', restarts: 1, age: '25h', node: 'node-1', cpu: '18%', memory: '35%' }
    ]
  },
  {
    name: 'mono-epass-uat-control',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '20%',
    memory: '40%',
    pods: [
      { name: 'mono-epass-uat-control-767dfff5b6-sxcpz', status: 'Running', restarts: 0, age: '25h', node: 'node-3', cpu: '20%', memory: '40%' }
    ]
  },
  {
    name: 'mono-epass-uat-intc',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '14%',
    memory: '28%',
    pods: [
      { name: 'mono-epass-uat-intc-7f7955fbdb-h45kg', status: 'Running', restarts: 0, age: '25h', node: 'node-2', cpu: '14%', memory: '28%' }
    ]
  },
  {
    name: 'mono-epass-uat-ints',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '16%',
    memory: '32%',
    pods: [
      { name: 'mono-epass-uat-ints-7f7955fbdb-wkcrp', status: 'Running', restarts: 0, age: '25h', node: 'node-1', cpu: '16%', memory: '32%' }
    ]
  },
  {
    name: 'mono-loadtest-payment',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '10%',
    memory: '20%',
    pods: [
      { name: 'mono-loadtest-payment-7dc856fcbb-p5415', status: 'Running', restarts: 0, age: '41h', node: 'node-3', cpu: '10%', memory: '20%' }
    ]
  },
  {
    name: 'mono-uat-get-ttd',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '8%',
    memory: '18%',
    pods: [
      { name: 'mono-uat-get-ttd-79c84846c-f94w6', status: 'Running', restarts: 0, age: '128m', node: 'node-2', cpu: '8%', memory: '18%' }
    ]
  },
  {
    name: 'mono-uat-login',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '12%',
    memory: '24%',
    pods: [
      { name: 'mono-uat-login-58b95bb6fcb-gp9xq', status: 'Running', restarts: 0, age: '128m', node: 'node-1', cpu: '12%', memory: '24%' }
    ]
  },
  {
    name: 'mono-uat-newton',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '15%',
    memory: '30%',
    pods: [
      { name: 'mono-uat-newton-696db6bb-996xd', status: 'Running', restarts: 0, age: '128m', node: 'node-3', cpu: '15%', memory: '30%' }
    ]
  },
  {
    name: 'mono-uat-payment',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '22%',
    memory: '45%',
    pods: [
      { name: 'mono-uat-payment-5b64c6c85-8x9m2', status: 'Running', restarts: 0, age: '123m', node: 'node-2', cpu: '22%', memory: '45%' }
    ]
  },
  {
    name: 'mono-uat-quote',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '18%',
    memory: '36%',
    pods: [
      { name: 'mono-uat-quote-687795b8b9-g2w4t', status: 'Running', restarts: 0, age: '128m', node: 'node-1', cpu: '18%', memory: '36%' }
    ]
  },
  {
    name: 'mono-uat-refund',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '14%',
    memory: '28%',
    pods: [
      { name: 'mono-uat-refund-65d75f8d-4bb77f', status: 'Running', restarts: 0, age: '128m', node: 'node-3', cpu: '14%', memory: '28%' }
    ]
  },
  {
    name: 'newton-uat-default',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '25%',
    memory: '50%',
    pods: [
      { name: 'newton-uat-default-8669cc5fc6-mn5zc', status: 'Running', restarts: 0, age: '35d', node: 'node-2', cpu: '25%', memory: '50%' }
    ]
  },
  {
    name: 'paylater-uat-default',
    namespace: 'core-uat',
    replicas: 1,
    maxReplicas: 1,
    status: 'Running',
    cpu: '30%',
    memory: '60%',
    pods: [
      { name: 'paylater-uat-default-778ff9b7cf-amt1q', status: 'Running', restarts: 0, age: '22d', node: 'node-1', cpu: '30%', memory: '60%' }
    ]
  }
];
