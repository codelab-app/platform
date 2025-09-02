# DNS entry point for Grafana web UI
# Creates grafana.codelab.app -> Grafana droplet IP
# Users access Grafana dashboards via this domain on port 80
# Note: Loki (port 3100) uses direct IP within VPC for log ingestion
resource "digitalocean_record" "grafana" {
  domain = var.codelab_app_domain
  type   = "A"
  name   = "grafana"
  value  = digitalocean_droplet.grafana.ipv4_address
  ttl    = 300
}