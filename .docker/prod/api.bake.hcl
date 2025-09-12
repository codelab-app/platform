# API service specific bake configuration
# Import base configuration
group "default" {
  targets = ["api"]
}

import "./base.bake.hcl"

target "api" {
  inherits = ["base"]
  context = "."
  dockerfile = "${DOCKERFILE_DIR}/api.Dockerfile"
  tags = [
    "${REGISTRY}/api:${DOCKER_TAG_VERSION}",
    "${REGISTRY}/api:latest"
  ]
  args = {
    NX_CLOUD_ACCESS_TOKEN = "${NX_CLOUD_ACCESS_TOKEN}"
  }
}