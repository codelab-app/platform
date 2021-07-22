# alb.tf

resource "aws_alb" "main" {
  name            = "${var.app_name}-load-balancer"
  subnets         = aws_subnet.public.*.id
  security_groups = [aws_security_group.lb.id]
}

resource "aws_alb_target_group" "app" {
  name            = "${var.app_name}-target-group-app"
  port            = 80
  protocol        = "HTTP"
  vpc_id          = aws_vpc.main.id
  target_type     = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = var.health_check_path
    unhealthy_threshold = "2"
  }
}

resource "aws_alb_listener" "http_listener" {
  load_balancer_arn = aws_alb.main.id
  port              = 80
  protocol          = "HTTP"
  depends_on        = [aws_alb_target_group.app]

  default_action {
    target_group_arn = aws_alb_target_group.app.id
    type             = "forward"
  }
}
