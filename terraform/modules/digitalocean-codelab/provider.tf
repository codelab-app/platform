terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "2.34.1"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_app" "codelab" {
  spec {
    name = "codelab"
    region = "sfo"

    domain {
      name = "codelab.ai"
    }

    ingress {
      rule {
        component {
          name = "platform-web"
        }

        match {
          path {
            prefix = "/"
          }
        }
      }

      rule {
        component {
          name = "platform-api"
        }

        match {
          path {
            prefix = "/api"
          }
        }
      }
    }

    service {
      name = "platform-web"

      github {
        branch         = "terraform-do"
        deploy_on_push = true
        repo           = "codelab-app/platform"
      }

      build_command = "scripts/digitalocean/platform/build.sh"
      run_command = "scripts/digitalocean/platform/run.sh"

      env {
        key   = "AUTH0_SECRET"
        value = var.auth0_secret
      }

      env {
        key   = "AUTH0_ISSUER_BASE_URL"
        value = var.auth0_issuer_base_url
      }

      env {
        key   = "AUTH0_CLIENT_SECRET"
        value = var.auth0_client_secret
      }

      env {
        key   = "AUTH0_CLIENT_ID"
        value = var.auth0_client_id
      }

      env {
        key   = "NEXT_PUBLIC_PLATFORM_HOST"
        value = var.next_public_platform_host
      }

      env {
        key   = "NEXT_PUBLIC_PLATFORM_API_HOST"
        value = var.next_public_platform_api_host
      }

    }

    service {
      name = "platform-api"

      github {
        branch         = "terraform-do"
        deploy_on_push = true
        repo           = "codelab-app/platform"
      }

      build_command = "scripts/digitalocean/platform-api/build.sh"
      run_command = "scripts/digitalocean/platform-api/run.sh"

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
        key   = "NEXT_PUBLIC_PLATFORM_API_HOST"
        value = var.next_public_platform_api_host
      }

      env {
        key   = "AUTH0_ISSUER_BASE_URL"
        value = var.auth0_issuer_base_url
      }
    }
  }
}
