locals {
  api_domain = var.stage == "production" ? "api.${var.app_domain}" : "${var.stage}.api.${var.app_domain}"
}
data "aws_route53_zone" "primary_route" {
  name         = var.app_domain
}

resource "aws_route53_record" "api" {
  zone_id      = data.aws_route53_zone.primary_route.zone_id
  name         = local.api_domain
  type         = "A"

  alias {
    name       = aws_cloudfront_distribution.webapp.domain_name
    zone_id    = aws_cloudfront_distribution.webapp.hosted_zone_id
    evaluate_target_health = true
  }
}