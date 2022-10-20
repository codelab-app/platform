## Run Terraform

```
# Select workspace programatically
# These workspace names come from Terraform Cloud
export TF_WORKSPACE=builder-prod #builder-prod

cd terraform
terraform init
terraform plan
terraform apply
```

```
# Format files
cd terraform
terraform fmt
```


## Notes

Modules usually don't declare their own providers. The providers are either inherited from the calling root module or passed in.

`A module intended to be called by one or more other modules must not contain any provider blocks. A module containing its own provider configurations is not compatible with the for_each, count, and depends_on arguments that were introduced in Terraform v0.13`

