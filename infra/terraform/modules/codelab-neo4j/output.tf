# Outputs for the codelab-neo4j module

output "neo4j_uri" {
  value       = "bolt://neo4j.codelab.app:7687"
  description = "Neo4j connection URI"
}

output "neo4j_internal_ip" {
  value       = digitalocean_droplet.neo4j.ipv4_address_private
  description = "Neo4j droplet private IP address"
}

output "neo4j_external_ip" {
  value       = digitalocean_droplet.neo4j.ipv4_address
  description = "Neo4j droplet public IP address"
}