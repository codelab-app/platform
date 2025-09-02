source "digitalocean" "web" {
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = "s-1vcpu-1gb-intel"  # Match Terraform deployment size
  ssh_username = "root"
  snapshot_name = "codelab-web-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-web-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "web", "service"]
}

build {
  sources = ["source.digitalocean.web"]

  # Web-specific template
  provisioner "file" {
    source      = "web/docker-compose.ctmpl"
    destination = "/etc/consul-template/docker-compose.ctmpl"
  }

  # Add consul-client.hcl for Web service
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

  # Setup Docker registry authentication
  provisioner "shell" {
    inline = [
      "doctl registry login"
    ]
  }

  # Clean up and optimize snapshot size
  provisioner "shell" {
    inline = [
      "echo 'Web service image built successfully'",
      "",
      "# Clean up temporary files only (no apt operations needed)",
      "rm -rf /tmp/* /var/tmp/*",
      "",
      "# Trim filesystem to minimize snapshot size",
      "fstrim -av"
    ]
  }
}