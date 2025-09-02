source "digitalocean" "neo4j" {
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = local.droplet_sizes.medium  # Neo4j needs more RAM
  ssh_username = "root"
  snapshot_name = "codelab-neo4j-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-neo4j-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "neo4j", "service"]
}

build {
  sources = ["source.digitalocean.neo4j"]

  # Use Ansible for provisioning
  provisioner "ansible" {
    playbook_file = "neo4j/playbook.yml"
    extra_arguments = [
      "--extra-vars",
      "digitalocean_api_token=${var.digitalocean_api_token}",
      "--extra-vars",
      "region=${var.do_region}"
    ]
  }
}