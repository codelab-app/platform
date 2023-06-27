resource "vercel_project_domain" "platform" {
  project_id = vercel_project.platform.id
  domain     = replace(var.next_public_platform_host, "https", "")
}

resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.platform.id
  domain     = "www.${replace(var.next_public_platform_host, "https", "")}"

  redirect             = vercel_project_domain.platform.domain
  redirect_status_code = 308
}
