# Base configuration with shared variables
# This file is imported by service-specific bake files

variable "REGISTRY" {
  default = "registry.digitalocean.com/codelabapp"
}

variable "DOCKER_TAG_VERSION" {
  default = "latest"
}

variable "DOCKERFILE_DIR" {
  default = ".docker/prod"
}

# Shared build args that multiple services use
variable "NX_CLOUD_ACCESS_TOKEN" {}
variable "NEXT_PUBLIC_WEB_HOST" {}
variable "NEXT_PUBLIC_API_PORT" {}
variable "NEXT_PUBLIC_BASE_API_PATH" {}
variable "NEXT_PUBLIC_API_HOSTNAME" {}

# Platform configuration for DigitalOcean Kubernetes (AMD64 only)
variable "PLATFORM" {
  default = "linux/amd64"
}

# Base target with common settings
target "base" {
  platforms = ["${PLATFORM}"]
  no-cache-filter = ["build"]
}