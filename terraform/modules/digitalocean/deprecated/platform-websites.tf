resource "digitalocean_app" "platform-websites" {
  spec {
    name   = "platform-websites"
    region = "sfo"

    domain {
      name = "demo-codelab.online"
      zone = "demo-codelab.online"
    }

    domain {
      name = "websites.codelab.app"
      zone = "codelab.app"
    }

    domain {
      name     = "production-demo-app.websites.codelab.app"
      type     = "ALIAS"
      wildcard = false
      zone     = "codelab.app"
    }

    domain {
      name     = "test-2.com"
      type     = "ALIAS"
      wildcard = false
    }

    service {
      instance_size_slug = "basic-xxs"
      name               = "platform-websites"
      http_port          = 443

      git {
        branch         = "staging"
        repo_clone_url = "https://github.com/codelab-app/platform"
      }

      # This will replace buildpacks
      dockerfile_path = ".docker/platform.Dockerfile"
      # build_command = "scripts/digitalocean/websites/build.sh"
      run_command = "scripts/digitalocean/websites/run.sh"

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
        key   = "NEXT_PUBLIC_PLATFORM_API_HOSTNAME"
        value = var.next_public_platform_api_hostname
      }

      env {
        key   = "NEXT_PUBLIC_PLATFORM_API_PORT"
        value = var.next_public_platform_api_port
      }
    }
  }
}
