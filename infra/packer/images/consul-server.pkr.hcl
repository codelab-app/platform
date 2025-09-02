source "digitalocean" "consul-server" {
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = "s-1vcpu-1gb-intel"  # Match Terraform deployment size
  ssh_username = "root"
  snapshot_name = "codelab-consul-server-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-consul-server-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "consul", "server"]
}

build {
  sources = ["source.digitalocean.consul-server"]

  # Consul SERVER configuration - needs external API access for:
  # - Terraform Cloud to write configuration via consul provider
  # - Consul UI access from browsers
  # - CLI access for administration
  provisioner "file" {
    source      = "../modules/consul-server/consul-server.hcl"
    destination = "/etc/consul.d/consul-server.hcl"
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
      "echo 'Consul Server image built successfully'",
      "",
      "# Clean up temporary files only (no apt operations needed)",
      "rm -rf /tmp/* /var/tmp/*",
      "",
      "# Trim filesystem to minimize snapshot size",
      "fstrim -av"
    ]
  }
}