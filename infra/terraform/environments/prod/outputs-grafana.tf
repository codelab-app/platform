output "grafana_url" {
  value       = module.grafana.grafana_url
  description = "URL to access Grafana dashboard"
}

output "grafana_ip" {
  value       = module.grafana.grafana_ip
  description = "IP address of Grafana droplet"
}

output "loki_push_url" {
  value       = module.grafana.loki_push_url
  description = "Loki push URL for Docker log driver configuration"
  sensitive   = false
}