source "digitalocean" "web" {
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = local.droplet_sizes.small  # Match Terraform deployment size
  ssh_username = "root"
  snapshot_name = "codelab-web-${local.timestamp_local}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-web-${local.timestamp_local}"
  tags         = ["packer", "web", "service"]
}

build {
  sources = ["source.digitalocean.web"]

  # Use Ansible for provisioning
  provisioner "ansible" {
    ansible_env_vars = [
      "ANSIBLE_CONFIG=${path.root}/ansible.cfg"
    ]
    playbook_file = "web/playbook.yml"
    extra_arguments = [
      "-v",  # Show config file being used
      "--extra-vars",
      "digitalocean_api_token=${var.digitalocean_api_token}",
      "--extra-vars",
      "region=${var.do_region}"
    ]
  }
}