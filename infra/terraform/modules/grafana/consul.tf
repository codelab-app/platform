# Configure Consul KV for Grafana and Loki settings
resource "consul_key_prefix" "grafana_config" {
  path_prefix = "config/grafana/"

  subkeys = {
    "admin_user"     = "admin"
    "admin_password" = var.grafana_admin_password
    "version"        = "11.1.0"
    "vpc_ip"         = digitalocean_droplet.grafana.ipv4_address_private
  }
}

resource "consul_key_prefix" "loki_config" {
  path_prefix = "config/loki/"

  subkeys = {
    "url"     = "http://${digitalocean_droplet.grafana.ipv4_address}:3100/loki/api/v1/push"
    "version" = "3.0.0"
  }
}