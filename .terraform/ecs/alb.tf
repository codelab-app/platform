resource "aws_alb" "hasura" {
  name            = "hasura-alb"
  subnets         = ["${aws_subnet.hasura_ecs.*.id}"]
  security_groups = ["${aws_security_group.hasura_alb.id}"]

  access_logs {
    bucket = "${aws_s3_bucket.hasura.id}"
    prefix = "alb"
    enabled = true
  }
}