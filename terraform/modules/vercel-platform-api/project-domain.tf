resource "vercel_project_domain" "platform_api" {
  project_id = vercel_project.platform_api.id
  domain     = replace(var.platform_api_host, "https://", "")
}

resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.platform_api.id
  domain     = "www.${replace(var.platform_api_host, "https://", "")}"

  redirect             = vercel_project_domain.platform_api.domain
  redirect_status_code = 308
}
