# Sites service specific bake configuration
# Import base configuration
group "default" {
  targets = ["sites"]
}

import "./base.bake.hcl"

# Sites-specific variables  
variable "NEXT_PUBLIC_SUPABASE_URL" {}
variable "NEXT_PUBLIC_SUPABASE_KEY" {}
variable "SUPABASE_DB_PASS" {}

target "sites" {
  inherits = ["base"]
  context = "."
  dockerfile = "${DOCKERFILE_DIR}/sites.Dockerfile"
  tags = [
    "${REGISTRY}/sites:${DOCKER_TAG_VERSION}",
    "${REGISTRY}/sites:latest"
  ]
  args = {
    NEXT_PUBLIC_SUPABASE_URL = "${NEXT_PUBLIC_SUPABASE_URL}"
    NEXT_PUBLIC_SUPABASE_KEY = "${NEXT_PUBLIC_SUPABASE_KEY}"
    NEXT_PUBLIC_WEB_HOST = "${NEXT_PUBLIC_WEB_HOST}"
    SUPABASE_DB_PASS = "${SUPABASE_DB_PASS}"
    NX_CLOUD_ACCESS_TOKEN = "${NX_CLOUD_ACCESS_TOKEN}"
  }
}