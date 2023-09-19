resource "vercel_project_domain" "platform_api" {
  project_id = vercel_project.platform_api.id
  domain     = replace(var.next_public_platform_api_host, "https://", "")
}

resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.platform_api.id
  domain     = "www.${replace(var.next_public_platform_api_host, "https://", "")}"

  redirect             = vercel_project_domain.platform_api.domain
  redirect_status_code = 308
}
