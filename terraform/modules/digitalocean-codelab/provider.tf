terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "2.15.0"
    }
  }
}

variable "do_token" {
  type = string
  description = "DO token for API access"
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_app" "codelab" {
  spec {
    name = "codelab"
    region = "sfo"

    domain {
      name = "admin.codelab.app"
    }

    service {
      name = "platform-web"
    }

    service {
      name = "platform-api"
    }
    # static_site {
    #   name          = "web"
    #   build_command = "npm run build"

    #   github {
    #     branch         = "master"
    #     deploy_on_push = true
    #     repo           = "codelab-app/platform"
    #   }
    # }
  }
}
