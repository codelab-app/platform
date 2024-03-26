resource "digitalocean_app" "platform-api" {
  spec {
    name   = "platform-api"
    region = "sfo"

    domain {
      name = "api.codelab.app"
      zone = "codelab.app"
    }

    service {
      instance_size_slug = "basic-xxs"
      name               = "platform-api"
      http_port          = 443

      # git {
      #   branch         = "staging"
      #   repo_clone_url = "https://github.com/codelab-app/platform"
      # }

      image {
        registry_type = "DOCR"
        repository    = "platform-api"

        deploy_on_push {
          enabled = true
        }
      }

      # build_command = "scripts/digitalocean/platform-api/build.sh" run_command   = "scripts/digitalocean/platform-api/run.sh"

      env {
        key   = "NEO4J_USER"
        value = var.neo4j_user
      }

      env {
        key   = "NEO4J_URI"
        value = var.neo4j_uri
      }

      env {
        key   = "NEO4J_PASSWORD"
        value = var.neo4j_password
      }

      env {
        key   = "NEXT_PUBLIC_PLATFORM_API_HOSTNAME"
        value = var.next_public_platform_api_hostname
      }

      env {
        key   = "NEXT_PUBLIC_PLATFORM_API_PORT"
        value = var.next_public_platform_api_port
      }

      env {
        key   = "AUTH0_ISSUER_BASE_URL"
        value = var.auth0_issuer_base_url
      }
    }

    # Docker
    #
    # https://docs.digitalocean.com/products/app-platform/how-to/manage-internal-routing/
    #
    # https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-neo4j-on-ubuntu-20-04
    # worker {
    #   instance_count     = 1
    #   instance_size_slug = "basic-xs"
    #   name               = "neo4j"
    #   run_command        = "['neo4j', 'start']"

    #   image {
    #     registry      = "library"
    #     registry_type = "DOCKER_HUB"
    #     repository    = "neo4j"
    #     tag           = "5.11.0"
    #   }

    #   env {
    #     key   = "NEO4J_ACCEPT_LICENSE_AGREEMENT"
    #     value = "yes"
    #   }
    #   env {
    #     key   = "NEO4J_apoc_export_file_enabled"
    #     value = "true"
    #   }
    #   env {
    #     key   = "NEO4J_apoc_import_file_enabled"
    #     value = "true"
    #   }
    #   env {
    #     key   = "NEO4J_apoc_import_file_use__neo4j__config"
    #     value = "true"
    #   }
    #   env {
    #     key   = "NEO4J_dbms.security.procedures.unrestricted"
    #     value = "apoc.*"
    #   }
    #   env {
    #     key   = "NEO4J_PLUGINS"
    #     value = "[\"apoc\"]"
    #   }
    #   env {
    #     key   = "NEO4J_AUTH"
    #     value = "neo4j/password"
    #   }
    # }
  }
}
