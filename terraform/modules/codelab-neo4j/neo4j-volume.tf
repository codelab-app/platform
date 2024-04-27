resource "digitalocean_volume" "neo4j" {
  region                  = "sfo2"
  name                    = "neo4j-volumes"
  size                    = 100
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
