# Terraform Cloud module for prod environment (if needed)
module "tf" {
  source = "../../modules/terraform"

  terraform_user_token         = var.TERRAFORM_USER_TOKEN
  terraform_organization_token = var.TERRAFORM_ORGANIZATION_TOKEN
}