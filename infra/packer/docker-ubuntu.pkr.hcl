packer {
  required_plugins {
    digitalocean = {
      version = ">= 1.0.4"
      source  = "github.com/digitalocean/digitalocean"
    }

    docker = {
      version = ">= 1.0.8"
      source = "github.com/hashicorp/docker"
    }
  }
}

variable "DIGITALOCEAN_ACCESS_TOKEN" {
  type    = string
  default = ""
  sensitive = true
}

variable "DIGITALOCEAN_REGION" {
  type    = string
  default = "sgp1"
}

source "digitalocean" "ubuntu_docker" {
  api_token    = var.DIGITALOCEAN_ACCESS_TOKEN
  image        = "docker-20-04"
  region       = var.DIGITALOCEAN_REGION
  size   = "s-2vcpu-2gb-intel"
  ssh_username = "root"
}

build {
  name    = "codelab-image"

  sources = ["source.digitalocean.ubuntu_docker"]

  provisioner "shell" {
    inline = [
      "snap install doctl",
      "docker plugin install grafana/loki-docker-driver:2.9.2 --alias loki --grant-all-permissions"
    ]
  }
}
