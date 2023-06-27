resource "vercel_project_domain" "platform_api_next" {
  project_id = vercel_project.platform_api_next.id
  domain     = replace(var.platform_api_host, "https://", "")
}

resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.platform_api_next.id
  domain     = "www.${replace(var.platform_api_host, "https://", "")}"

  redirect             = vercel_project_domain.platform_api_next.domain
  redirect_status_code = 308
}
