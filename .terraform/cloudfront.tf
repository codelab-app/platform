data "aws_acm_certificate" "default" {
  domain          = "api.${var.app_domain}"
  statuses        = ["ISSUED", "PENDING_VALIDATION"]
  provider        = aws.useast1
}

resource "aws_cloudfront_distribution" "webapp" {
  depends_on = [
    aws_alb.main,
  ]

  origin {
    domain_name = aws_alb.main.dns_name

    origin_id = "${var.app_name}-webapp"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"

      origin_ssl_protocols = [
        "SSLv3",
        "TLSv1",
      ]
    }
  }

  price_class = "PriceClass_200"

  aliases = ["staging.api.${var.app_domain}"]

  enabled = true

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn    = data.aws_acm_certificate.default.arn
    ssl_support_method     = "sni-only"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.app_name}-webapp"

    forwarded_values {
      query_string = true
      headers      = ["Host", "Origin"]

      cookies {
        forward           = "none"
      }
    }

    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }  
}
