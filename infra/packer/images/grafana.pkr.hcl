source "digitalocean" "grafana" {
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = local.droplet_sizes.medium  # Grafana/Loki needs more RAM
  ssh_username = "root"
  snapshot_name = "codelab-grafana-${local.timestamp_local}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-grafana-${local.timestamp_local}"
  tags         = ["packer", "grafana", "monitoring", "service"]
  
  # Disable package updates during cloud-init to speed up builds
  user_data = <<-EOF
    #cloud-config
    package_update: false
    package_upgrade: false
  EOF
}

build {
  sources = ["source.digitalocean.grafana"]

  # Use Ansible for provisioning
  provisioner "ansible" {
    ansible_env_vars = [
      "ANSIBLE_CONFIG=${path.root}/ansible.cfg"
    ]
    playbook_file = "grafana/playbook.yml"
    extra_arguments = [
      "-v",  # Show config file being used
      "--extra-vars",
      "digitalocean_api_token=${var.digitalocean_api_token}",
      "--extra-vars",
      "region=${var.do_region}",
      "--extra-vars",
      "consul_encrypt_key=${var.consul_encrypt_key}"
    ]
  }
}