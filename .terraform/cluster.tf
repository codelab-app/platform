resource "digitalocean_kubernetes_cluster" "prod_codelab" {
  name    = "prod-codelab"
  region  = var.region
  auto_upgrade = false
  version = "1.19.3-do.1"

  node_pool {
    name       = "worker-pool"
    size       = "s-2vcpu-2gb"
    node_count = 1
  }
}
