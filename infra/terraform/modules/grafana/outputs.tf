output "grafana_ip" {
  value       = digitalocean_droplet.grafana.ipv4_address
  description = "IP address of Grafana droplet"
}

output "grafana_url" {
  value       = "http://grafana.${var.codelab_app_domain}"
  description = "URL to access Grafana"
}

output "loki_url" {
  value       = "http://${digitalocean_droplet.grafana.ipv4_address}:3100"
  description = "Loki endpoint for log ingestion"
}

output "loki_push_url" {
  value       = "http://${digitalocean_droplet.grafana.ipv4_address}:3100/loki/api/v1/push"
  description = "Full Loki push API URL for Docker logging driver"
}