variable "terraform_user_token" {
  type        = string
  description = "A user API token has the same permission level as your user account. It is the only type of token which can be granted access to multiple organizations. Generate user API tokens on your account settings page."
  default     = ""
}


variable "terraform_organization_token" {
  type        = string
  description = "The organization API token is used to manage teams, team membership and workspaces. This token does not have permission to perform plans and applies in workspaces. For more information, see the organization service account documentation."
  default     = ""
}
