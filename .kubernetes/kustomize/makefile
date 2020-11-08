#
# KUBERNETES
#

kube-apply:
	kustomize build overlays/staging | kubectl apply -n codelab -f -

kube-replace:
	kustomize build overlays/staging | kubectl replace -f -

kube-build:
	kustomize build overlays/staging