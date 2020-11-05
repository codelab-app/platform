resource "digitalocean_database_cluster" "prod_postgres_codelab" {
  name       = "prod-posgres-codelab"
  engine     = "pg"
  version    = "12"
  size       = "db-s-1vcpu-1gb"
  region     = var.region
  node_count = 1
}

resource "digitalocean_database_db" "prod_postgresdb_codelab" {
  cluster_id = digitalocean_database_cluster.prod_postgres_codelab.id
  name       = "codelab"
}
