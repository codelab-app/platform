# Sites service specific bake configuration
group "default" {
  targets = ["sites"]
}

# Sites-specific variables
variable "NEXT_PUBLIC_SUPABASE_URL" {}
variable "NEXT_PUBLIC_SUPABASE_KEY" {}
variable "SUPABASE_DB_PASS" {}

# Web-specific variables
variable "AUTH0_SECRET" {}
variable "AUTH0_DOMAIN" {}
variable "AUTH0_CLIENT_ID" {}
variable "AUTH0_CLIENT_SECRET" {}

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