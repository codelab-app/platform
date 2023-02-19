resource "vercel_project_domain" "websites" {
  project_id = vercel_project.websites.id
  domain     = var.next_public_websites_host
}

resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.websites.id
  domain     = "www.${var.next_public_websites_host}"

  redirect             = vercel_project_domain.websites.domain
  redirect_status_code = 308
}
