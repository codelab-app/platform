# Outputs for the codelab-api module

output "codelab_api_hostname" {
  value       = "api.codelab.app"
  description = "API hostname"
}

output "codelab_api_internal_ip" {
  value       = digitalocean_droplet.codelab_api.ipv4_address_private
  description = "API droplet private IP address"
}

output "codelab_api_external_ip" {
  value       = digitalocean_droplet.codelab_api.ipv4_address
  description = "API droplet public IP address"
}