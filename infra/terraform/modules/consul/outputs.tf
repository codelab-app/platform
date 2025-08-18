output "consul_server_private_ip" {
  value       = digitalocean_droplet.consul_server.ipv4_address_private
  description = "Private IP of the Consul server"
}

output "consul_server_public_ip" {
  value       = digitalocean_droplet.consul_server.ipv4_address
  description = "Public IP of the Consul server"
}

output "consul_datacenter" {
  value       = var.datacenter
  description = "Consul datacenter name"
}