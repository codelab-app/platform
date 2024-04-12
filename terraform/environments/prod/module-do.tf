module "digitalocean-codelab" {
  source = "../../modules/digitalocean"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN

  # auth0_secret            = var.AUTH0_SECRET
  # auth0_web_client_id     = module.auth0.web_client.id
  # auth0_web_client_secret = module.auth0.web_client.client_secret

  # next_public_web_host         = var.NEXT_PUBLIC_WEB_HOST

  # We are using VPC
  # next_public_api_hostname = var.NEXT_PUBLIC_API_HOSTNAME next_public_api_port     = var.NEXT_PUBLIC_API_PORT

  # neo4j_user     = var.NEO4J_USER
  # neo4j_uri      = var.NEO4J_URI
  # neo4j_password = var.NEO4J_PASSWORD

  # mailchimp_list_id       = var.MAILCHIMP_LIST_ID
  # mailchimp_api_key       = var.MAILCHIMP_API_KEY
  # mailchimp_server_prefix = var.MAILCHIMP_SERVER_PREFIX
}
