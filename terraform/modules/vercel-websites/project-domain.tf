resource "vercel_project_domain" "websites" {
  project_id = vercel_project.websites.id
  # builder uses "admin.codelab.app" and user websites use "apps.codelab.app"
  domain     = replace(var.next_public_platform_host, "admin", "apps")
}
