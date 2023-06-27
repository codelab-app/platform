resource "vercel_project_domain" "websites" {
  project_id = vercel_project.websites.id
  # platform uses "admin.codelab.app" and user websites use "apps.codelab.app"
  domain = replace(var.vercel_websites_host, "https://", "")
}
