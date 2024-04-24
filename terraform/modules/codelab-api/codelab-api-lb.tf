# https://docs.digitalocean.com/products/networking/load-balancers/how-to/ssl-termination/
#
# 2 ways to setup the LB
#
# 1) SSL termination
# 2) SSL passthrough
#
# When your web frontend makes requests to your API using HTTPS, the SSL/TLS certificate needs to be attached and managed at the point where SSL termination occurs.

#
# When `web` calls `api` SSL/TLS handshake happens
#
# Need private DNS to resolve the certificate, since IP changes
#
# DO need to setup BIND https://www.digitalocean.com/community/tutorials/how-to-configure-bind-as-a-private-network-dns-server-on-ubuntu-20-04
#
# resource "digitalocean_loadbalancer" "api" {
#   name   = "api-load-balancer"
#   region = "sfo2"

#   vpc_uuid = var.codelab_app_vpc_id

#   droplet_ids = [
#     digitalocean_droplet.codelab_api.id,
#   ]

#   forwarding_rule {
#     entry_port     = 443
#     entry_protocol = "https"

#     target_port     = 80
#     target_protocol = "http"

#     certificate_name = digitalocean_certificate.api.id
#   }

#   healthcheck {
#     port     = 22
#     protocol = "tcp"
#   }
# }