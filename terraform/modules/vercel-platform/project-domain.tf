resource "vercel_project_domain" "platform" {
  project_id = vercel_project.platform.id
  domain     = var.next_public_platform_host
}

resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.platform.id
  domain     = "www.${var.next_public_platform_host}"

  redirect             = vercel_project_domain.platform.domain
  redirect_status_code = 308
}
