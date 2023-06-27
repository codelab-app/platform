module "vercel-landing" {
  source = "../../modules/vercel-landing"

  vercel_team_id           = var.VERCEL_TEAM_ID
  next_public_landing_host = var.NEXT_PUBLIC_LANDING_HOST

  mailchimp_api_key       = var.MAILCHIMP_API_KEY
  mailchimp_list_id       = var.MAILCHIMP_LIST_ID
  mailchimp_server_prefix = var.MAILCHIMP_SERVER_PREFIX

  next_public_intercom_app_id = var.NEXT_PUBLIC_INTERCOM_APP_ID

  next_public_hotjar_id              = var.NEXT_PUBLIC_HOTJAR_ID
  next_public_hotjar_snippet_version = var.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION

  next_public_supabase_url = var.NEXT_PUBLIC_SUPABASE_URL
  next_public_supabase_key = var.NEXT_PUBLIC_SUPABASE_KEY
}
