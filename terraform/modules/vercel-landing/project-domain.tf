resource "vercel_project_domain" "landing" {
  project_id = vercel_project.landing.id
  domain     = var.NEXT_PUBLIC_LANDING_HOST
}

resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.landing.id
  domain     = "www.${var.NEXT_PUBLIC_LANDING_HOST}"

  redirect             = vercel_project_domain.landing.domain
  redirect_status_code = 308
}
