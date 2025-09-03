# Manage Consul KV configuration for Neo4j service
resource "consul_keys" "neo4j_config" {
  # Neo4j-specific configuration
  key {
    path  = "config/docker/neo4j_tag_version"
    value = var.docker_tag_version
  }
  
  key {
    path  = "config/neo4j/uri"
    value = "neo4j://${digitalocean_droplet.neo4j.ipv4_address_private}:7687"
  }
  
  key {
    path  = "config/neo4j/user"
    value = var.neo4j_user
  }
  
  key {
    path  = "config/neo4j/password"
    value = var.neo4j_password
  }
  
  key {
    path  = "config/neo4j/version"
    value = "enterprise"
  }
  
  key {
    path  = "config/neo4j/heap_initial_size"
    value = "1G"
  }
  
  key {
    path  = "config/neo4j/heap_max_size"
    value = "2G"
  }
  
  key {
    path  = "config/neo4j/pagecache_size"
    value = "512M"
  }
  
  # Loki configuration for Neo4j logging
  key {
    path  = "config/neo4j/loki_url"
    value = var.loki_url
  }
  
  # Prometheus configuration for Neo4j metrics
  key {
    path  = "config/neo4j/prometheus_write_url"
    value = var.prometheus_write_url
  }
  
  key {
    path  = "config/neo4j/prometheus_username"
    value = var.prometheus_username
  }
  
  key {
    path  = "config/neo4j/prometheus_password"
    value = var.prometheus_password
  }
}