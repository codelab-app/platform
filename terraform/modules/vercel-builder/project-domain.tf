resource "vercel_project_domain" "builder" {
  project_id = vercel_project.builder.id
  domain     = var.next_public_builder_host
}

resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.builder.id
  domain     = "www.${var.next_public_builder_host}"

  redirect             = vercel_project_domain.builder.domain
  redirect_status_code = 308
}
