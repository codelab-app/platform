resource "digitalocean_app" "platform-api" {
  spec {
    name = "platform-api"
    region = "sfo"

    domain {
      name = "api.codelab.app"
      zone = "codelab.app"
    }

    service {
      name = "platform-api"
      http_port = 443

      git {
        branch         = "remove_middleware"
        repo_clone_url = "https://github.com/codelab-app/platform"
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

      env {
        key   = "AUTH0_CLIENT_ID"
        value = var.auth0_client_id
      }

      env {
        key   = "AUTH0_SECRET"
        value = var.auth0_secret
      }

      env {
        key   = "AUTH0_AUDIENCE"
        value = var.next_public_platform_api_hostname
      }

      env {
        key   = "AUTH0_CLIENT_SECRET"
        value = var.auth0_client_secret
      }

      env {
        key   = "NEXT_PUBLIC_PLATFORM_HOST"
        value = var.next_public_platform_host
      }
    }
  }
}
