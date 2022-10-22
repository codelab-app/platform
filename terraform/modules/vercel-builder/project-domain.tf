resource "vercel_project_domain" "builder" {
  project_id = vercel_project.builder.id
  domain     = var.NEXT_PUBLIC_BUILDER_HOST
}

resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.builder.id
  domain     = "www.${var.NEXT_PUBLIC_BUILDER_HOST}"

  redirect             = vercel_project_domain.builder.domain
  redirect_status_code = 308
}
