#cloud-config

# Cloud init is copied to droplet then run, you can run schema check there to make sure settings are valid
# Any change here will destroy and re-create the droplet, since cloud-init is only run once

# https://forums.centos.org/viewtopic.php?t=66712
# systemd-resolved manages /etc/resolv.conf
manage_resolv_conf: true

package_update: true
package_upgrade: true
# package_reboot_if_required: true

# packages:
#   # https://stackoverflow.com/questions/24418815/how-do-i-install-docker-using-cloud-init/62540068#62540068
#   - docker.io
#   - docker-compose

# # create the docker group
# groups:
#   - docker

# # Add default auto created user to docker group
# system_info:
#   default_user:
#     groups: [docker]

# $HOME is /root
# Cannot use ~/ here

#
# Lifecycle
#

# For cloud-init lifecycle can see /etc/cloud/cloud.cfg
#
# We don't really need these, just explicitly show what is the order

# cloud_init_modules:
#   - write_files

# cloud_config_modules:
#   # Need this or else runcmd won't run
#   # https://gist.github.com/mikesager/f091fc374547e4304ec2d8c517f13cbe
#   - runcmd

# cloud_final_modules:
#   - final_message
# # Allows running of shell scripts in the script-user directory
# #   - scripts-user

#
# Lifecycle End
#

write_files:
  - path: /root/.config/doctl/config.yaml
    content: |
      access-token: ${digitalocean_access_token}
  # cloud_final_modules.scripts-user will run the scripts in /var/lib/cloud/scripts/
  - path: /var/lib/cloud/scripts/per-once/setup.sh
        permissions: '0755'
        encoding: b64
        content: ${filebase64(var.setup_script)}
  - path: /root/docker/docker-compose.yml
    # owner: docker:docker
    permissions: '0644'
    content: |
      version: '3.8'
      services:
        landing:
          image: registry.digitalocean.com/codelabapp/landing:latest
          restart: unless-stopped
          ports:
            - "80:3000"
          environment:
            - MAILCHIMP_LIST_ID=${mailchimp_list_id}
            - MAILCHIMP_API_KEY=${mailchimp_api_key}
            - MAILCHIMP_SERVER_PREFIX=${mailchimp_server_prefix}

# If the item is a list, the items will be properly executed as if passed to execve(3) (with the first arg as the command).
# If the item is a string, it will be simply written to the file and will be interpreted by 'sh'
runcmd:
  - echo "Starting \"snap install doctl\" >> /var/log/cloud-init.log
  # - snap install doctl
  # - echo "Starting \"snap connect doctl:dot-docker\" >> /var/log/cloud-init.log
  # - snap connect doctl:dot-docker
  # # https://github.com/digitalocean/doctl?tab=readme-ov-file#configuring-default-values
  # - echo "Starting \"doctl auth init\" >> /var/log/cloud-init.log
  # - doctl auth init --access-token ${digitalocean_access_token}
  # - cd /root/docker
  # - echo "Starting \"docker run\" >> /var/log/cloud-init.log
  # - echo "$digitalocean_access_token" | docker login --username codelabapp --password-stdin registry.digitalocean.com
  # # - docker-compose pull && docker-compose up -d --force-recreate
  # - docker compose pull && docker compose up -d --force-recreate
