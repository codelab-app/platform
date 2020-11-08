# HOW TO

This terraform code initializes infrastructure at DigitalOcean. Here are steps
you need to follow to provision it.

Required terraform version: `~< 0.12.25`

### Step 1: Generate you credentials at DO's API page

We need 3 environment variables to using terraform:
- `DIGITALOCEAN_TOKEN`: Digital Ocean's personal access tokens
- `AWS_ACCESS_KEY_ID`: Digital Ocean's space access key
- `AWS_SECRET_ACCESS_KEY`: Digital Ocean's space access secret

If you have them before, you can ignore this step. If not, you must generate
them at : https://cloud.digitalocean.com/account/api/tokens

### Step 2: Export environment variables

```
# export needed ENVs
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=yyy
export DIGITALOCEAN_TOKEN=zzz
```
### Step 3: Bootstrap the system

```
# init plugins
terraform init
# generate plan
terraform plan

# after review the changes, apply new changes
terraform apply -auto-approve
```
