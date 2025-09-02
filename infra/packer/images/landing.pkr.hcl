source "digitalocean" "landing" {
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = local.droplet_sizes.small  # Match Terraform deployment size
  ssh_username = "root"
  snapshot_name = "codelab-landing-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-landing-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "landing", "service"]
}

build {
  sources = ["source.digitalocean.landing"]

  # Use Ansible for provisioning
  provisioner "ansible" {
    playbook_file = "landing/playbook.yml"
    extra_arguments = [
      "--extra-vars",
      "digitalocean_api_token=${var.digitalocean_api_token}",
      "--extra-vars",
      "region=${var.do_region}"
    ]
  }
}