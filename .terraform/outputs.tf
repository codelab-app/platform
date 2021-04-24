output "eb-prod" {
  value = aws_elastic_beanstalk_environment.app-prod.cname
}

output "eb-staging" {
  value = aws_elastic_beanstalk_environment.app-staging.cname
}

