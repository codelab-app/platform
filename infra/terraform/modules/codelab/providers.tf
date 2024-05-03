terraform {
  required_version = "1.7.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.34.1"
    }

    docker = {
      source  = "kreuzwerker/docker"
      version = "2.16.0"
    }
  }
}

provider "digitalocean" {
  token = var.digitalocean_access_token
}

# provider "docker" {
#   host = "unix://var/run/docker.sock"

#   registry_auth {
#     address             = digitalocean_container_registry.codelab.server_url
#     config_file_content = digitalocean_container_registry_docker_credentials.codelab.docker_credentials
#   }
# }
