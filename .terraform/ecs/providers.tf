resource "aws_ecs_service" "hasura" {
  depends_on      = ["aws_ecs_task_definition.hasura", "aws_cloudwatch_log_group.hasura"]
  name            = "hasura-service"
  cluster         = aws_ecs_cluster.hasura.id
  task_definition = aws_ecs_task_definition.hasura.arn
  desired_count   = var.multi_az == true ? "2" : "1"
  launch_type     = "FARGATE"

  network_configuration {
    assign_public_ip = true
    security_groups  = ["${aws_security_group.hasura_ecs.id}"]
    subnets          = ["${aws_subnet.hasura_ecs.*.id}"]
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.hasura.id
    container_name   = "hasura"
    container_port   = "8080"
  }

  // depends_on = [
  //   "aws_alb_listener.hasura",
  // ]
}