variable "circleci_token" {
  type        = string
  description = "CircleCI API token, sets automatically when assigned as env"
}

variable "cypress_record_key" {
  type        = string
  description = "The record key is used to authenticate that your project is allowed to record tests to the Dashboard Service"
}

variable "slack_access_token" {
  type        = string
  description = "Access token for Slack"
}

variable "slack_default_channel" {
  type        = string
  description = "Default channel for Slack notifications"
}

variable "terraform_token" {
  type        = string
  description = "Terraform API token"
}

variable "next_public_supabase_url" {
  type        = string
  description = "Next public Supabase URL"
}

variable "next_public_supabase_key" {
  type        = string
  description = "Next public Supabase key"
}

variable "vercel_access_token" {
  type        = string
  description = "Access token to access Vercel API"
}

variable "nx_cloud_access_token" {
  type        = string
  description = "Read/write access token to access NX Cloud"
}
