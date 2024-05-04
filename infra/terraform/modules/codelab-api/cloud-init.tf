locals {
  docker_daemon = templatefile("${path.module}/tftpl/daemon.tftpl.json", {
    loki_url = var.loki_url
  })

  docker_compose = templatefile("${path.module}/tftpl/docker-compose.tftpl.yaml", {
    auth0_m2m_client_id     = "",
    auth0_m2m_client_secret = "",
    neo4j_uri               = var.neo4j_uri,
    neo4j_user              = var.neo4j_user,
    neo4j_password          = var.neo4j_password
    docker_tag_version      = var.docker_tag_version
    auth0_domain            = var.auth0_domain
    next_public_api_port    = var.next_public_api_port,
    # local_port              = local.local_port
  })

  start_docker_image = templatefile("${path.module}/tftpl/start-docker-image.tftpl.sh", {
    digitalocean_access_token = var.digitalocean_access_token
  })
}

data "cloudinit_config" "api" {
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
        }
      ],
      runcmd = [
        ["cloud-init-per", "once", "start-docker-image", "/var/lib/cloud/scripts/per-once/start-docker-image.sh"]
      ]
    })
  }
}
