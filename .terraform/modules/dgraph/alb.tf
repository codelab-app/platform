
resource "aws_alb" "dgraph" {
  name            = "${var.dgraph_name}-load-balancer"
  internal        = true
  subnets         = var.subnets
  security_groups = [aws_security_group.dgraph_lb.id]
}

resource "aws_alb_target_group" "dgraph" {
  name            = "${var.dgraph_name}-target-group"
  port            = var.dgraph_port
  protocol        = "HTTP"
  vpc_id          = var.vpc_id
  target_type     = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = "/"
    unhealthy_threshold = "2"
  }
}

resource "aws_alb_listener" "dgraph_listener" {
  load_balancer_arn = aws_alb.dgraph.id
  port              = var.dgraph_port
  protocol          = "HTTP"
  depends_on        = [aws_alb_target_group.dgraph]

  default_action {
    target_group_arn = aws_alb_target_group.dgraph.id
    type             = "forward"
  }
}


