terraform {
  required_version = "1.7.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

variable "DIGITALOCEAN_ACCESS_TOKEN" {
  type        = string
  description = "Digital Ocean access token"
}

provider "digitalocean" {
  token = var.DIGITALOCEAN_ACCESS_TOKEN
}

resource "digitalocean_database_cluster" "redis_cluster" {
  count      = 0
  name       = "redis-cluster"
  engine     = "redis"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc1"
  version    = "6"
  node_count = 1
}

# resource "digitalocean_database_db" "redis_db" {
#   cluster_id = digitalocean_database_cluster.redis_cluster.id
#   name       = "codelab-redis-db"
# }
