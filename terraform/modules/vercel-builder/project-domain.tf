resource "vercel_project_domain" "builder" {
  project_id = vercel_project.builder.id
  domain     = "admin.codelab.app"
}

resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.builder.id
  domain     = "www.admin.codelab.app"

  redirect             = vercel_project_domain.builder.domain
  redirect_status_code = 308
}
