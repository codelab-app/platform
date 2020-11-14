#
# KUBERNETES
#

kube-apply:
	kustomize build overlays/staging | kubectl apply -n codelab -f -

kube-replace:
	kustomize build overlays/staging | kubectl replace -f -

kube-build:
	kustomize build overlays/staging

kube-prod-apply:
	kustomize build overlays/prod | kubectl apply -n codelab -f -

kube-prod-replace:
	kustomize build overlays/prod | kubectl replace -f -

kube-prod-build:
	kustomize build overlays/prod
