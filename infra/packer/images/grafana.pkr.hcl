source "digitalocean" "grafana" {
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = "s-1vcpu-2gb-intel"  # Grafana/Loki needs more RAM
  ssh_username = "root"
  snapshot_name = "codelab-grafana-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-grafana-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "grafana", "monitoring", "service"]
}

build {
  sources = ["source.digitalocean.grafana"]

  # Grafana-specific template (includes Loki)
  provisioner "file" {
    source      = "grafana/docker-compose.ctmpl"
    destination = "/etc/consul-template/docker-compose.ctmpl"
  }

  # Create volume directories for Grafana/Loki
  provisioner "shell" {
    inline = [
      "mkdir -p /mnt/loki_data",
      "mkdir -p /mnt/grafana_data",
      "mkdir -p /mnt/grafana_provisioning"
    ]
  }

  # Add consul-client.hcl for Grafana service
  provisioner "file" {
    content     = templatefile("../modules/consul-client/consul-client.hcl.tpl", {
      digitalocean_api_token = var.digitalocean_api_token
      region                 = var.do_region
    })
    destination = "/etc/consul.d/consul-client.hcl"
  }

  # Fix permissions for Consul configuration files
  provisioner "shell" {
    inline = [
      "chown consul:consul /etc/consul.d/*.hcl",
      "chmod 640 /etc/consul.d/*.hcl"
    ]
  }

  # Clean up and optimize snapshot size
  provisioner "shell" {
    inline = [
      "echo 'Grafana service image built successfully'",
      "",
      "# Clean up temporary files only (no apt operations needed)",
      "rm -rf /tmp/* /var/tmp/*",
      "",
      "# Trim filesystem to minimize snapshot size",
      "fstrim -av"
    ]
  }
}