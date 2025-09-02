resource "digitalocean_record" "neo4j_a_record" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "neo4j"
  # Changed from load balancer IP to droplet IP (using Caddy for SSL)
  value  = digitalocean_droplet.codelab_neo4j.ipv4_address
  ttl    = 3600
}

# resource "digitalocean_record" "neo4j_cadvisor_a_record" {
#   domain = var.codelab_app_domain_id
#   type   = "A"
#   name   = "*.neo4j"
#   value  = digitalocean_loadbalancer.neo4j.ip
#   ttl    = 3600
# }

# resource "digitalocean_record" "neo4j_cadvisor_cname" {
#   domain = var.codelab_app_domain_id
#   type   = "CNAME"
#   name   = "www.cadvisor.neo4j"
#   value  = "cadvisor.neo4j.codelab.app."
#   ttl    = 3600
# }

# resource "digitalocean_record" "neo4j_traefik_cname" {
#   domain = var.codelab_app_domain_id
#   type   = "CNAME"
#   name   = "www.traefik.neo4j"
#   value  = "traefik.neo4j.codelab.app."
#   ttl    = 3600
# }
