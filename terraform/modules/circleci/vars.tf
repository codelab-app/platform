variable "circleci_token" {
  type = string
  description = "CircleCI API token, sets automatically when assigned as env"
}

variable "cypress_record_key" {
  type = string
  description = "The record key is used to authenticate that your project is allowed to record tests to the Dashboard Service"
}

variable "dev_upsert_user_middleware" {
  type = string
  description = "Allows for Next.js middleware to upsert user during development mode"
}

variable "nx_cloud_access_token" {
  type = string
  description = "Access token for NX Cloud for caching"
}

variable "slack_access_token" {
  type = string
  description = "Access token for Slack"
}

variable "slack_default_channel" {
  type = string
  description = "Default channel for Slack notifications"
}

variable "terraform_token" {
  type = string
  description = "Terraform API token"
}
