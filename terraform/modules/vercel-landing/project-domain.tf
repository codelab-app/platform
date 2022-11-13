resource "vercel_project_domain" "landing" {
  project_id = vercel_project.landing.id
  domain     = var.next_public_landing_host
}

resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.landing.id
  domain     = "www.${var.next_public_landing_host}"

  redirect             = vercel_project_domain.landing.domain
  redirect_status_code = 308
}
