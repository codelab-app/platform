# VAULT'S K8s AUTHENTICATION ON STAGING

Here are steps to integrating Vault (https://vault.codelab.ai) with Staging Kubernetes.
Basically we must follow the following steps:
1. Get needed values:
- Serviceaccount's token jwt key and kuber ca cert
- Kubernetes API host
2. Enable new auth method on Vault
3. Create K/V engine & policy

First of all, we need to install vault binary, download it from https://learn.hashicorp.com/tutorials/vault/agent-kubernetes,
let's use the latest version.

Then export required environment variables

```

export VAULT_TOKEN=<YOUR VAULT TOKEN>
export VAULT_ADDR=https://vault.codelab.io

# validate vault status
Key             Value
---             -----
Seal Type       shamir
Initialized     true
Sealed          false
Total Shares    5
Threshold       3
Version         1.5.4
Cluster Name    vault-cluster-740e0f88
Cluster ID      19468604-e732-7cbb-68ff-3b5a2f0a3fb6
HA Enabled      false

```


### 1. Get needed values

We're using the service account: `codelab-service-account` , let's get its JWT and CA


```

export VAULT_SA_NAME=$(kubectl get sa codelab-service-account \
    -o jsonpath="{.secrets[*]['name']}")
export SA_JWT_TOKEN=$(kubectl get secret $VAULT_SA_NAME \
    -o jsonpath="{.data.token}" | base64 --decode; echo)
export SA_CA_CRT=$(kubectl get secret $VAULT_SA_NAME \
    -o jsonpath="{.data['ca\.crt']}" | base64 --decode; echo)

```

And Cluster API is


```
#  k cluster-info
export K8S_HOST=ed9f294c-ad11-48d3-a36b-4819c7e1e78b.k8s.ondigitalocean.com

```

### 2.Enable vault methods

```

# auth: k8s-staging , method: kubernetes
vault auth enable -path=k8s-staging kubernetes


vault write auth/k8s-staging/config \
        token_reviewer_jwt="$SA_JWT_TOKEN" \
        kubernetes_host="https://$K8S_HOST:8443" \
        kubernetes_ca_cert="$SA_CA_CRT"

```


### 3. Create K/V Engine and Policy


Create a new k/v secret engine with  path codelab-staging

```

vault secrets enable -version=2 -path=codelab-staging kv

```

Then create a new policy name `readonly-codelab-staging` for kv engine `codelab-staging`
```

vault policy write readonly-codelab-staging - <<EOF
path "secret/data/codelab-staging/*" {
  capabilities = ["read"]
}
EOF
