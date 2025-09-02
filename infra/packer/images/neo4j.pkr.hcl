source "digitalocean" "neo4j" {
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = "s-1vcpu-2gb-intel"  # Match Terraform deployment size (needs more RAM)
  ssh_username = "root"
  snapshot_name = "codelab-neo4j-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-neo4j-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "neo4j", "service"]
}

build {
  sources = ["source.digitalocean.neo4j"]

  # Neo4j-specific template
  provisioner "file" {
    source      = "neo4j/docker-compose.ctmpl"
    destination = "/etc/consul-template/docker-compose.ctmpl"
  }

  # Add consul-client.hcl for Neo4j service
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
      "echo 'Neo4j service image built successfully'",
      "",
      "# Clean up temporary files only (no apt operations needed)",
      "rm -rf /tmp/* /var/tmp/*",
      "",
      "# Trim filesystem to minimize snapshot size",
      "fstrim -av"
    ]
  }
}