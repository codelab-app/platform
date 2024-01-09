resource "digitalocean_app" "platform-web" {
  spec {
    name = "platform-web"
    region = "sfo"

    domain {
      name = "admin.codelab.app"
      zone = "codelab.app"
    }

    service {
      name = "platform-web"
      http_port = 443

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
  }
}
