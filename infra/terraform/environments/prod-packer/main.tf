terraform {
  cloud {
    organization = "codelab-app"
    workspaces {
      name = "prod-packer"
    }
  }
}

# Create an env solely for the purpose of fetching env values

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
