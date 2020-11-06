## Nodes

- each node gets a range of IP's

## Pods

- ephemeral
- each pod has unique IP

## Services:

- stable IP address
- load balancing to pod replicas
- not a process, an abstract layer for IP addresses
- identify pods by selectors
- identify port using targetPort

### ClusterIP

- default
- accessible within cluster only

### NodePort

- static port on each worker node
- external traffic available
- defined range 30000 - 32767

### LoadBalancer

- Cloud provider specific
- redirects to Ingress controller
- Digital ocean will automatically provision a LB when it sees an Ingress Controller

### Headless

- None will return Pod IP instead of Service IP

## Ingress

- Ingress is the rules object abstract for routing
- Need implementation in form of Ingress controller
- Could be native Nginx Ingress controller, or third party
- This is the entrypoint into the internal services
- Doesn't eliminate need for LB, is just a router

## API Gateway

https://www.getambassador.io/learn/kubernetes-ingress/kubernetes-ingress-nodeport-load-balancers-and-ingress-controllers/

- provides application requirements like authentication, rate limiting
- overcome limitations of ingress standards
- edge issues

Examples:

- Kong (built on NGINX)
- Ambassador (built on Envoy)

## Services Mesh

- More fine grained controller at the application layer

Examples

- Itsio
- Consul
- Linkerd

## Api Gateway vs Services Mesh

Both

- service discovery
- request routing
- authentication
- rate limiting
- monitoring
- observability

- [Api Gateway N-S, Service Mesh E-W](https://aspenmesh.io/api-gateway-vs-service-mesh/)
- [Api Gateway for business functionality, Service Mesh for service-to-service](https://aspenmesh.io/api-gateway-vs-service-mesh/)

## Edge Proxy

- Envoy
