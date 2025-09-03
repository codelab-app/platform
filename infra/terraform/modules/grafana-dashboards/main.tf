locals {
  dashboard_files = fileset("${path.module}/dashboards", "*.json")
}

# Create folder for organizing dashboards
resource "grafana_folder" "monitoring" {
  title = "Monitoring"
  uid   = "monitoring"
}

# Create Loki datasource
resource "grafana_data_source" "loki" {
  type = "loki"
  name = "Loki"
  url  = "http://loki:3100"
  
  json_data_encoded = jsonencode({
    maxLines = 1000
    timeout  = 60
  })
}

# Upload all dashboards
resource "grafana_dashboard" "dashboards" {
  for_each = local.dashboard_files
  
  folder      = grafana_folder.monitoring.id
  config_json = file("${path.module}/dashboards/${each.value}")
  
  lifecycle {
    ignore_changes = [config_json]  # Prevent unnecessary updates
  }
}