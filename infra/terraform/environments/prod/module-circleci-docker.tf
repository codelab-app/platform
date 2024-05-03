module "circleci" {
  source = "../../modules/circleci-docker"

  next_public_web_host     = var.NEXT_PUBLIC_WEB_HOST
  next_public_api_hostname = module.codelab_api.codelab_api_hostname
  next_public_api_port     = var.NEXT_PUBLIC_API_PORT

  auth0_domain = var.AUTH0_DOMAIN
  auth0_secret = var.AUTH0_SECRET

  auth0_web_client_id     = module.auth0.web_client.id
  auth0_web_client_secret = module.auth0.web_client.client_secret

  circleci_token = var.CIRCLECI_TOKEN

  docker_tag_version = var.DOCKER_TAG_VERSION

  # terraform_token       = var.TERRAFORM_TOKEN

  # dockerhub_username     = var.DOCKERHUB_USERNAME
  # dockerhub_access_token = var.DOCKERHUB_ACCESS_TOKEN

  # digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
}
