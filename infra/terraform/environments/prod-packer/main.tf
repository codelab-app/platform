terraform {
  cloud {
    organization = "codelab-app"
    workspaces {
      name = "prod-packer"
    }
  }
}

# Allow other workspaces to read our state
# This needs to be configured in Terraform Cloud UI:
# Settings -> General -> Remote state sharing
# Add: prod, ci, dev workspaces as consumers

# Variable for Consul encryption key
# This is set in Terraform Cloud workspace variables
variable "CONSUL_ENCRYPT_KEY" {
  type        = string
  description = "Consul gossip encryption key for Packer builds"
  sensitive   = true
}

# Output for other workspaces to consume
output "consul_encrypt_key" {
  value       = var.CONSUL_ENCRYPT_KEY
  sensitive   = true
  description = "Consul encryption key for Packer image builds"
}