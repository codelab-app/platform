resource "digitalocean_volume" "neo4j" {
  region                  = var.digitalocean_region
  name                    = "neo4j-volumes"
  size                    = 50
  initial_filesystem_type = "ext4"
  # description             = "an example volume"
}

resource "digitalocean_volume_attachment" "neo4j" {
  droplet_id = digitalocean_droplet.neo4j.id
  volume_id  = digitalocean_volume.neo4j.id

  # Otherwise would not attachment if droplet reboots
  lifecycle {
    replace_triggered_by = [digitalocean_droplet.neo4j.id]
  }
}

resource "digitalocean_volume" "neo4j_prometheus" {
  region                  = var.digitalocean_region
  name                    = "neo4j-prometheus-volumes"
  size                    = 10
  initial_filesystem_type = "ext4"
  # description             = "an example volume"
}

resource "digitalocean_volume_attachment" "neo4j_prometheus" {
  droplet_id = digitalocean_droplet.neo4j.id
  volume_id  = digitalocean_volume.neo4j_prometheus.id

  # Otherwise would not attachment if droplet reboots
  lifecycle {
    replace_triggered_by = [digitalocean_droplet.neo4j.id]
  }
}
