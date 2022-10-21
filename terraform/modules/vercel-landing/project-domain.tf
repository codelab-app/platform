resource "vercel_project_domain" "landing" {
  project_id = vercel_project.landing.id
  domain     = "codelab.app"
}

resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.landing.id
  domain     = "www.codelab.app"

  redirect             = vercel_project_domain.landing.domain
  redirect_status_code = 308
}
