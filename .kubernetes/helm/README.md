# Helm charts managements

### Directories
Kubernetes helm charts deployments

There are 3 directories are working as roles below:
- `prod`: contains kubernetes helmcharts for prod environment
- `stag`: contains kubernetes helmcharts for stag environment
- `lib`: contains all resources which can be used for both prod and stag environments

### Prerequisites

Helm version:
```
version.BuildInfo{Version:"v3.4.0", GitCommit:"7090a89efc8a18f3d8178bf47d2462450349a004", GitTreeState:"clean", GoVersion:"go1.14.10"}
```

Install plugins as requirements:

```
helm plugin install https://github.com/aslafy-z/helm-git.git --version 0.5.0
helm plugin install https://github.com/databus23/helm-diff --version 3.1.3
```
### HOW TO

#### 1. Cert manger

On staging
```
cd stag
kubectl apply \
    -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.11/deploy/manifests/00-crds.yaml
helmfile -l name=cert-manager diff
helmfile -l name=server-manager apply

# wait 2 minutes to let cert-manage created needed pods, then create cluster-issuer
kubectl apply -f resources/cert-manager/
```
On production
```
cd prod
kubectl apply \
    -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.11/deploy/manifests/00-crds.yaml
helmfile -l name=cert-manager diff
helmfile -l name=server-manager apply

# wait 2 minutes to let cert-manage created needed pods, then create cluster-issuer
kubectl apply -f resources/cert-manager/
```

Validation

```
$ k get clusterissuer
NAME                  AGE
letsencrypt-prod      59s
letsencrypt-staging   59s
```
#### 2. Ambassador

##### a. Cluster side
On production
```
cd prod
kubectl apply -f https://www.getambassador.io/yaml/aes-crds.yaml
kubectl create namespace ambassador
helmfile -l name=ambassador diff
helmfile -l name=ambassador apply
```

##### b. Client side
Install edgectl on Mac OS
```
curl -fL https://metriton.datawire.io/downloads/darwin/edgectl \
  -o ~/.local/bin/edgectl \
  && chmod +x ~/.loca/bin/edgectl

edgectl install
```
After ran `edgectl install`, a new ambassador admin site will be created, e.g: https://randomize-xxxx-4199.edgestack.me/
It also automatically open Ambassador admin from the web browser. In here, we can do management of Ambassador.

In the future, to login to Admabsssador admin page again, we need to run
```
edgectl login  https://randomize-xxxx-4199.edgestack.me/
```
