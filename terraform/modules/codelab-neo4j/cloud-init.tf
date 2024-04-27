locals {
  docker_daemon = templatefile("${path.module}/tftpl/daemon.tftpl.json", {
    loki_url = var.loki_url
  })

  docker_compose = templatefile("${path.module}/tftpl/docker-compose.tftpl.yaml", {
  })

  start_docker_image = templatefile("${path.module}/tftpl/start-docker-image.tftpl.sh", {
    digitalocean_access_token = var.digitalocean_access_token
  })

  mount_volumes = templatefile("${path.module}/tftpl/mount-volumes.tftpl.sh", {})
}

data "cloudinit_config" "neo4j" {
  gzip          = false
  base64_encode = false

  part {
    filename     = "cloud-config.yaml"
    content_type = "text/cloud-config"

    content = yamlencode({
      write_files = [
        {
          path        = "/root/.config/doctl/config.yaml"
          permissions = "0644"
          content     = "access-token: ${var.digitalocean_access_token}"
        },
        {
          path    = "/etc/docker/daemon.tmp.json",
          content = local.docker_daemon
        },
        {
          path        = "/root/docker/docker-compose.yml"
          permissions = "0644"
          content     = local.docker_compose
        },
        {
          path        = "/var/lib/cloud/scripts/per-once/start-docker-image.sh"
          permissions = "0755"
          content     = local.start_docker_image
        },
        {
          path        = "/var/lib/cloud/scripts/per-once/mount-volumes.sh"
          permissions = "0755"
          content     = local.mount_volumes
        },
      ],
      runcmd = [
        ["cloud-init-per", "once", "mount-volumes", "/var/lib/cloud/scripts/per-once/mount-volumes.sh"],
        ["cloud-init-per", "once", "start-docker-image", "/var/lib/cloud/scripts/per-once/start-docker-image.sh"],
      ]
    })
  }
}
