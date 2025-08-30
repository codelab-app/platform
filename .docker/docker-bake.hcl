# Docker Bake configuration for building and pushing images
# Usage: docker buildx bake api
#        docker buildx bake --push api
#        docker buildx bake --push all

variable "REGISTRY" {
  default = "registry.digitalocean.com/codelabapp"
}

variable "DOCKER_TAG_VERSION" {
  default = "latest"
}

variable "DOCKERFILE_DIR" {
  default = ".docker/prod"
}

# Build arg variables
variable "NX_CLOUD_ACCESS_TOKEN" {}
variable "NEXT_PUBLIC_SUPABASE_URL" {}
variable "NEXT_PUBLIC_SUPABASE_KEY" {}
variable "NEXT_PUBLIC_WEB_HOST" {}
variable "SUPABASE_DB_PASS" {}
variable "NEXT_PUBLIC_API_PORT" {}
variable "NEXT_PUBLIC_BASE_API_PATH" {}
variable "NEXT_PUBLIC_API_HOSTNAME" {}
variable "AUTH0_SECRET" {}
variable "AUTH0_DOMAIN" {}
variable "AUTH0_CLIENT_ID" {}
variable "AUTH0_CLIENT_SECRET" {}

# Define all services as a group
group "default" {
  targets = ["api", "landing", "web", "sites"]
}

group "all" {
  targets = ["api", "landing", "web", "sites"]
}

# API service
target "api" {
  context = "."
  dockerfile = "${DOCKERFILE_DIR}/api.Dockerfile"
  tags = [
    "${REGISTRY}/api:${DOCKER_TAG_VERSION}",
    "${REGISTRY}/api:latest"
  ]
  args = {
    NX_CLOUD_ACCESS_TOKEN = "${NX_CLOUD_ACCESS_TOKEN}"
  }
  no-cache-filter = ["build"]
}

# Landing service
target "landing" {
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
  no-cache-filter = ["build"]
}

# Web service
target "web" {
  context = "."
  dockerfile = "${DOCKERFILE_DIR}/web.Dockerfile"
  tags = [
    "${REGISTRY}/web:${DOCKER_TAG_VERSION}",
    "${REGISTRY}/web:latest"
  ]
  args = {
    NEXT_PUBLIC_WEB_HOST = "${NEXT_PUBLIC_WEB_HOST}"
    NEXT_PUBLIC_API_PORT = "${NEXT_PUBLIC_API_PORT}"
    NEXT_PUBLIC_BASE_API_PATH = "${NEXT_PUBLIC_BASE_API_PATH}"
    NEXT_PUBLIC_API_HOSTNAME = "${NEXT_PUBLIC_API_HOSTNAME}"
    AUTH0_SECRET = "${AUTH0_SECRET}"
    AUTH0_DOMAIN = "${AUTH0_DOMAIN}"
    AUTH0_CLIENT_ID = "${AUTH0_CLIENT_ID}"
    AUTH0_CLIENT_SECRET = "${AUTH0_CLIENT_SECRET}"
    NX_CLOUD_ACCESS_TOKEN = "${NX_CLOUD_ACCESS_TOKEN}"
  }
  no-cache-filter = ["build"]
}

# Sites service
target "sites" {
  context = "."
  dockerfile = "${DOCKERFILE_DIR}/sites.Dockerfile"
  tags = [
    "${REGISTRY}/sites:${DOCKER_TAG_VERSION}",
    "${REGISTRY}/sites:latest"
  ]
  args = {
    NEXT_PUBLIC_WEB_HOST = "${NEXT_PUBLIC_WEB_HOST}"
    NEXT_PUBLIC_API_PORT = "${NEXT_PUBLIC_API_PORT}"
    NEXT_PUBLIC_BASE_API_PATH = "${NEXT_PUBLIC_BASE_API_PATH}"
    NEXT_PUBLIC_API_HOSTNAME = "${NEXT_PUBLIC_API_HOSTNAME}"
    AUTH0_SECRET = "${AUTH0_SECRET}"
    AUTH0_DOMAIN = "${AUTH0_DOMAIN}"
    AUTH0_CLIENT_ID = "${AUTH0_CLIENT_ID}"
    AUTH0_CLIENT_SECRET = "${AUTH0_CLIENT_SECRET}"
    NX_CLOUD_ACCESS_TOKEN = "${NX_CLOUD_ACCESS_TOKEN}"
  }
  no-cache-filter = ["build"]
}