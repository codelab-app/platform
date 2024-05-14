locals {
  docker_compose = templatefile("${path.module}/tftpl/docker-compose.tftpl.yaml", {
    next_public_web_host = var.next_public_web_host,
    # next_public_api_port     = var.next_public_api_port,
    # next_public_api_hostname = var.next_public_api_hostname,
    # auth0_secret             = var.auth0_secret,
    # auth0_domain             = var.auth0_domain,
    # auth0_client_id          = var.auth0_web_client_id,
    # auth0_client_secret      = var.auth0_web_client_secret,
    docker_tag_version = var.docker_tag_version
  })

  # promtail_config = templatefile("${path.module}/tftpl/promtail-config.tftpl.yaml", {
  #   loki_url = local.loki_url
  # })

  start_docker_image = templatefile("${path.module}/tftpl/start-docker-image.tftpl.sh", {
    digitalocean_access_token = var.digitalocean_access_token
  })

  docker_daemon = templatefile("${path.module}/tftpl/daemon.tftpl.json", {
    loki_url = var.loki_url
  })
}

data "cloudinit_config" "web" {
  gzip          = false
  base64_encode = false

  part {
    filename     = "cloud-config.yaml"
    content_type = "text/cloud-config"

    #cloud-config

    # lifecycle in /etc/cloud/cloud.cfg

    # cloud-init config in /var/lib/cloud/instance/user-data.txt

    # /var/lib/cloud/instances/*/sem tells us which has been ran

    # manage_resolv_conf: true

    # package_update: true
    # package_upgrade: true
    # package_reboot_if_required: true

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
        # {
        #   path        = "/root/docker/promtail/config.yaml"
        #   permissions = "0644"
        #   content     = local.promtail_config
        # },
        {
          path        = "/var/lib/cloud/scripts/per-once/start-docker-image.sh"
          permissions = "0755"
          content     = local.start_docker_image
        },
      ],
      # Still need to use this to call the user scripts
      runcmd = [
        ["cloud-init-per", "once", "start-docker-image", "/var/lib/cloud/scripts/per-once/start-docker-image.sh"]
      ]
    })
  }
}
