output "consul_server_public_ip" {
  value       = digitalocean_droplet.consul_server.ipv4_address
  description = "Public IP of the Consul server"
}