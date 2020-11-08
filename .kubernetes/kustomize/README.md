## Nodes

Kubernetes runs your workload by placing containers into Pods to run on Nodes. A node may be a virtual or physical machine, depending on the cluster. Each node contains the services necessary to run Pods, managed by the control plane.

- Max 5000 nodes per cluster

## Pods

Pods are the smallest deployable units of computing that you can create and manage in Kubernetes.

- Max 100 pods per node

## Containers

Each container that you run is repeatable; the standardization from having dependencies included means that you get the same behavior wherever you run it.

### Multi-container pods

https://medium.com/bb-tutorials-and-thoughts/understanding-multi-container-pods-12f5780f3956

The primary purpose of a multi-container Pod is to support co-located, co-managed helper processes for a main program.

- Can communicate via same network space using `localhost`
- Share same lifecycle
- Use same storage volume
- Share processes

### Common patters

- Sidebar (complementary service)
- Ambassador (proxy service)

## Kustomize

https://kubectl.docs.kubernetes.io/pages/reference/kustomize.html
