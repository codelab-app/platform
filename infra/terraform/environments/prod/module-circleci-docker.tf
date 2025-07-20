# CircleCI Docker context module for prod environment
module "circleci_docker" {
  source = "../../modules/circleci-docker"

  dockerhub_username     = var.DOCKERHUB_USERNAME
  dockerhub_access_token = var.DOCKERHUB_ACCESS_TOKEN
  docker_tag_version     = var.DOCKER_TAG_VERSION

  auth0_domain            = var.AUTH0_DOMAIN
  auth0_web_client_id     = module.auth0.web_client.client_id
  auth0_web_client_secret = module.auth0.web_client.client_secret
  auth0_secret            = var.AUTH0_SECRET
  next_public_web_host    = var.NEXT_PUBLIC_WEB_HOST

  next_public_api_hostname = module.codelab_api.codelab_api_hostname
  next_public_api_port     = var.NEXT_PUBLIC_API_PORT

  circleci_token = var.CIRCLECI_TOKEN
}