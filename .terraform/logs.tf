# logs.tf

# Set up CloudWatch group and log stream and retain logs for 30 days
resource "aws_cloudwatch_log_group" "cb_log_group" {
  name              = "/ecs/${var.app_name}-app"
  retention_in_days = 30

  tags = {
    Name = "${var.app_name}-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "cb_log_stream" {
  name           = "${var.app_name}-log-stream"
  log_group_name = aws_cloudwatch_log_group.cb_log_group.name
}

resource "aws_cloudwatch_log_group" "dgraph_zero_log_group" {
  name              = "/ecs/${var.app_name}-dgraph-zero"
  retention_in_days = 30

  tags = {
    Name = "${var.app_name}-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "dgraph_zero_log_stream" {
  name           = "${var.app_name}-dgraph-zero-log-stream"
  log_group_name = aws_cloudwatch_log_group.dgraph_zero_log_group.name
}


resource "aws_cloudwatch_log_group" "dgraph_alpha_log_group" {
  name              = "/ecs/${var.app_name}-dgraph-alpha"
  retention_in_days = 30

  tags = {
    Name = "${var.app_name}-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "dgraph_alpha_log_stream" {
  name           = "${var.app_name}-dgraph-alpha-log-stream"
  log_group_name = aws_cloudwatch_log_group.dgraph_alpha_log_group.name
}
