source "digitalocean" "consul-server" {
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = local.droplet_sizes.small  # Match Terraform deployment size
  ssh_username = "root"
  snapshot_name = "codelab-consul-server-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-consul-server-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "consul", "server"]
}

build {
  sources = ["source.digitalocean.consul-server"]

  # Use Ansible for provisioning
  # Consul SERVER configuration - needs external API access for:
  # - Terraform Cloud to write configuration via consul provider
  # - Consul UI access from browsers
  # - CLI access for administration
  provisioner "ansible" {
    playbook_file = "consul-server/playbook.yml"
  }
}