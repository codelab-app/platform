source "digitalocean" "sites" {
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = local.droplet_sizes.small  # Match Terraform deployment size
  ssh_username = "root"
  snapshot_name = "codelab-sites-${local.timestamp_local}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-sites-${local.timestamp_local}"
  tags         = ["packer", "sites", "service"]
  
  # Disable package updates during cloud-init to speed up builds
  user_data = <<-EOF
    #cloud-config
    package_update: false
    package_upgrade: false
  EOF
}

build {
  sources = ["source.digitalocean.sites"]

  # Use Ansible for provisioning
  provisioner "ansible" {
    ansible_env_vars = [
      "ANSIBLE_CONFIG=${path.root}/ansible.cfg"
    ]
    playbook_file = "sites/playbook.yml"
    extra_arguments = [
      "-v",  # Show config file being used
      "--extra-vars",
      "digitalocean_api_token=${var.digitalocean_api_token}",
      "--extra-vars",
      "region=${var.do_region}"
    ]
  }
}