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
    public_origin           = "https://${var.app_domain}"
    api_endpoint            = "https://${local.api_domain}"
    api_graphql_endpoint    = "https://${local.api_domain}/graphql"
    dgraph_graphql_endpoint = aws_ssm_parameter.dgraph_graphql_endpoint.arn,
    dgraph_endpoint         = aws_ssm_parameter.dgraph_endpoint.arn,
    dgraph_grpc_endpoint    = aws_ssm_parameter.dgraph_grpc_endpoint.arn,
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
    auth0_api_client_secret = aws_ssm_parameter.auth0_api_client_secret.arn,
    auth0_m2m_token         = aws_ssm_parameter.auth0_m2m_token.arn,
    cypress_auth0_user      = aws_ssm_parameter.cypress_auth0_user.arn,
    cypress_auth0_password  = aws_ssm_parameter.cypress_auth0_password.arn,
    nx_cloud_auth_token     = aws_ssm_parameter.nx_cloud_auth_token.arn
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
  desired_count   = var.app_count
  launch_type     = "FARGATE"
  
  deployment_circuit_breaker {
    enable        = true
    rollback      = true
  }

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

