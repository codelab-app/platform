# outputs.tf

output "alb_hostname" {
  value = aws_alb.dgraph.dns_name
}