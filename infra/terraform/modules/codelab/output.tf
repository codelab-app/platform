output "codelab_app_domain_id" {
  value = digitalocean_domain.codelab_app.id
}

output "codelab_app_domain" {
  value = digitalocean_domain.codelab_app.name
}

output "codelab_app_vpc_id" {
  value = digitalocean_vpc.codelab_app.id
}

output "codelab_app_certificate_id" {
  value = digitalocean_certificate.codelab_app.id
}
