# Web service specific bake configuration
group "default" {
  targets = ["web"]
}

# Web-specific variables
variable "AUTH0_SECRET" {}
variable "AUTH0_DOMAIN" {}
variable "AUTH0_CLIENT_ID" {}
variable "AUTH0_CLIENT_SECRET" {}

target "web" {
  inherits = ["base"]
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
}