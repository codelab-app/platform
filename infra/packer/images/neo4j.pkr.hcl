source "digitalocean" "neo4j" {
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = local.droplet_sizes.medium  # Neo4j needs more RAM
  ssh_username = "root"
  snapshot_name = "codelab-neo4j-${local.timestamp_local}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-neo4j-${local.timestamp_local}"
  tags         = ["packer", "neo4j", "service"]
  
  # Disable package updates during cloud-init to speed up builds
  user_data = <<-EOF
    #cloud-config
    package_update: false
    package_upgrade: false
  EOF
}

build {
  sources = ["source.digitalocean.neo4j"]

  # Use Ansible for provisioning
  provisioner "ansible" {
    ansible_env_vars = [
      "ANSIBLE_CONFIG=${path.root}/ansible.cfg"
    ]
    playbook_file = "neo4j/playbook.yml"
    extra_arguments = [
      "-v",  # Show config file being used
      "--extra-vars",
      "digitalocean_api_token=${var.digitalocean_api_token}",
      "--extra-vars",
      "region=${var.do_region}"
    ]
  }
}