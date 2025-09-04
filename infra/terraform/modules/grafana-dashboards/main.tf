locals {
  # Use static file list - dashboards should be compiled before module is called
  # The compilation is handled by the calling environment (prod-runtime)
  dashboard_files = fileset("${path.module}/dashboards", "*.gen.json")
}

# Create folder for organizing dashboards
resource "grafana_folder" "monitoring" {
  title = "Monitoring"
  uid   = "monitoring"
}

# Loki datasource already exists, created by Grafana module
# If you need to manage it here, first import it:
# terraform import module.grafana_dashboards.grafana_data_source.loki <datasource_id>
# resource "grafana_data_source" "loki" {
#   type = "loki"
#   name = "Loki"
#   url  = "http://loki:3100"
#   
#   json_data_encoded = jsonencode({
#     maxLines = 1000
#     timeout  = 60
#   })
# }

# Upload all dashboards
resource "grafana_dashboard" "dashboards" {
  for_each = local.dashboard_files
  
  folder      = grafana_folder.monitoring.id
  config_json = file("${path.module}/dashboards/${each.value}")
  overwrite   = true  # Force overwrite existing dashboards
  
  lifecycle {
    create_before_destroy = true  # Create new version before destroying old
  }
}