# Note: This requires the Grafana instance to be running and accessible
# The API key should be created manually or via a bootstrap process
# Dashboard will be provisioned after Grafana is deployed

resource "grafana_folder" "monitoring" {
  title = "Monitoring"
}

resource "grafana_dashboard" "docker_logs" {
  folder = grafana_folder.monitoring.id
  
  config_json = file("${path.module}/dashboards/docker-logs.json")
  
  lifecycle {
    ignore_changes = [config_json]
  }
}

resource "grafana_data_source" "loki" {
  type = "loki"
  name = "Loki"
  url  = "http://loki:3100"  # Uses Docker network name since they're on same network
  
  json_data_encoded = jsonencode({
    maxLines = 1000
    timeout  = 60
  })
}