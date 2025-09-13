# Sites service specific bake configuration
group "default" {
  targets = ["sites"]
}

# Sites-specific variables
variable "NEXT_PUBLIC_SUPABASE_URL" {}
variable "NEXT_PUBLIC_SUPABASE_KEY" {}
variable "SUPABASE_DB_PASS" {}

# Auth0 variables (needed for sites)
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
    NEXT_PUBLIC_API_PORT = "${NEXT_PUBLIC_API_PORT}"
    NEXT_PUBLIC_API_HOSTNAME = "${NEXT_PUBLIC_API_HOSTNAME}"
    NEXT_PUBLIC_BASE_API_PATH = "${NEXT_PUBLIC_BASE_API_PATH}"
    SUPABASE_DB_PASS = "${SUPABASE_DB_PASS}"
    NX_CLOUD_ACCESS_TOKEN = "${NX_CLOUD_ACCESS_TOKEN}"
    AUTH0_SECRET = "${AUTH0_SECRET}"
    AUTH0_DOMAIN = "${AUTH0_DOMAIN}"
    AUTH0_CLIENT_ID = "${AUTH0_CLIENT_ID}"
    AUTH0_CLIENT_SECRET = "${AUTH0_CLIENT_SECRET}"
  }
}