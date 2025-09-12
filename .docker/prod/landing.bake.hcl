# Landing service specific bake configuration
group "default" {
  targets = ["landing"]
}

# Landing-specific variables
variable "NEXT_PUBLIC_SUPABASE_URL" {}
variable "NEXT_PUBLIC_SUPABASE_KEY" {}
variable "SUPABASE_DB_PASS" {}

target "landing" {
  inherits = ["base"]
  context = "."
  dockerfile = "${DOCKERFILE_DIR}/landing.Dockerfile"
  tags = [
    "${REGISTRY}/landing:${DOCKER_TAG_VERSION}",
    "${REGISTRY}/landing:latest"
  ]
  args = {
    NEXT_PUBLIC_SUPABASE_URL = "${NEXT_PUBLIC_SUPABASE_URL}"
    NEXT_PUBLIC_SUPABASE_KEY = "${NEXT_PUBLIC_SUPABASE_KEY}"
    NEXT_PUBLIC_WEB_HOST = "${NEXT_PUBLIC_WEB_HOST}"
    SUPABASE_DB_PASS = "${SUPABASE_DB_PASS}"
    NX_CLOUD_ACCESS_TOKEN = "${NX_CLOUD_ACCESS_TOKEN}"
  }
}