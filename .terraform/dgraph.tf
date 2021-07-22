module "dgraph_service" {
  source          = "./modules/dgraph"
  count           = var.stage == "production" ? 0 : 1

  dgraph_name     = "${var.app_name}-dgraph"
  vpc_id          = aws_vpc.main.id
  ecs_cluster_id  = aws_ecs_cluster.main.id
  subnets         = aws_subnet.private.*.id
  dgraph_count    = var.stage == "production" ? 0 : 1
  dgraph_port     = 8080
  aws_region      = var.aws_region
  ecs_task_execution_role = aws_iam_role.ecs_task_execution_role.arn
}