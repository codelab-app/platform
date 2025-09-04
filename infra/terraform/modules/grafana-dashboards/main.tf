# Compile Jsonnet dashboards to JSON
resource "terraform_data" "build_dashboards" {
  triggers_replace = {
    # Rebuild when any Jsonnet file changes
    jsonnet_files = sha256(join("", [
      for f in fileset("${path.module}/dashboards", "*.jsonnet") : 
      filesha256("${path.module}/dashboards/${f}")
    ]))
    # Also rebuild if Makefile changes
    makefile = filesha256("${path.module}/Makefile")
  }
  
  provisioner "local-exec" {
    command = "cd ${path.module} && make build"
  }
  
  provisioner "local-exec" {
    when    = destroy
    command = "cd ${path.module} && make clean"
  }
}

locals {
  # Use static file list - we know what files will be generated
  dashboard_files = fileset("${path.module}/dashboards", "*.gen.json")
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
  
  # Ensure dashboards are built before uploading
  depends_on = [terraform_data.build_dashboards]
  
  lifecycle {
    ignore_changes = [config_json]  # Prevent unnecessary updates
  }
}