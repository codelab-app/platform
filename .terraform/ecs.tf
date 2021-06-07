# ecs.tf

resource "aws_ecs_cluster" "main" {
  name = "${var.app_name}-cluster"
}

## MAIN 
data "template_file" "cb_app" {
  template = file("./templates/ecs/cb_app.json.tpl")

  vars = {
    app_name       = var.app_name
    app_image      = aws_ecr_repository.main.repository_url
    app_port       = var.app_port
    fargate_cpu    = var.fargate_cpu
    fargate_memory = var.fargate_memory
    aws_region     = var.aws_region,
    dgraph_graphql_endpoint = aws_ssm_parameter.dgraph_graphql_endpoint.arn,
    dgraph_endpoint         = aws_ssm_parameter.dgraph_endpoint.arn,
    aws_access_key          = aws_ssm_parameter.aws_access_key.arn,
    aws_secret_key          = aws_ssm_parameter.aws_secret_key.arn,
    aws_bucket              = aws_ssm_parameter.aws_bucket.arn,
    auth0_secret            = aws_ssm_parameter.auth0_secret.arn,
    auth0_baseurl           = aws_ssm_parameter.auth0_baseurl.arn,
    auth0_issuer_baseurl    = aws_ssm_parameter.auth0_issuer_baseurl.arn,
    auth0_client_id         = aws_ssm_parameter.auth0_client_id.arn,
    auth0_client_secret     = aws_ssm_parameter.auth0_client_secret.arn,
    auth0_audience          = aws_ssm_parameter.auth0_audience.arn,
    auth0_api_client_id     = aws_ssm_parameter.auth0_api_client_id.arn,
    auth0_api_client_secret = aws_ssm_parameter.auth0_api_client_secret.arn
  }
}

resource "aws_ecs_task_definition" "app" {
  family                   = "${var.app_name}-app-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  container_definitions    = data.template_file.cb_app.rendered
}

resource "aws_ecs_service" "main" {
  name            = "${var.app_name}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.az_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.app.id
    container_name   = "${var.app_name}-app"
    container_port   = var.app_port
  }

  depends_on = [aws_alb_listener.http_listener, aws_iam_role_policy_attachment.ecs_task_execution_role]
}

## DGRAPH

### EFS
resource "aws_efs_file_system" "efs" {
  creation_token = "terraform-efs-fs"
  encrypted      = true
}

resource "aws_efs_mount_target" "efs" {
  file_system_id  = aws_efs_file_system.efs.id
  count           = var.dgraph_count
  subnet_id       = element(aws_subnet.private.*.id, count.index)
  security_groups = [aws_security_group.efs_sg.id]
}

data "template_file" "cb_dgraph" {
  template         = file("./templates/ecs/cb_dgraph.json.tpl")

  vars             = {
    app_name       = var.app_name,
    app_image      = "dgraph/dgraph:v21.03.0"
    app_port       = var.dgraph_port
    fargate_cpu    = 256
    fargate_memory = 512
    aws_region     = var.aws_region
    container_mount_path = "/dgraph"
    source_volume        = "efs-volume"
  }
}

resource "aws_ecs_task_definition" "dgraph" {
  family                   = "${var.app_name}-dgraph-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 512
  memory                   = 1024
  container_definitions    = data.template_file.cb_dgraph.rendered

  volume {
    name             = "efs-volume"

    efs_volume_configuration {
      file_system_id = aws_efs_file_system.efs.id
      root_directory = "/"
    }
  }
}

resource "aws_ecs_service" "dgraph" {
  name            = "dgraph-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.dgraph.arn
  desired_count   = var.dgraph_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.dgraph_tasks.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.dgraph.id
    container_name   = "alpha"
    container_port   = var.dgraph_port
  }

  depends_on = [aws_alb_listener.dgraph_listener, aws_iam_role_policy_attachment.ecs_task_execution_role]
}