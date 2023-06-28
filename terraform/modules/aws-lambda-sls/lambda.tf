variable "lambda_service_name" {
  default = "codelab-cli"
}

variable "serverless_stage" {
  default = "dev"
}

variable "built_filename" {
  default = "main"
}

locals {
  lambda_function_name = "${var.lambda_service_name}-${var.serverless_stage}-${var.built_filename}"
}

# We are creating a lambda function here because we want to inject Terraform Cloud envs into the existing lambda function created by serverless
# Trying out the new Terraform 1.5.0 import feature, where we can fetch an existing deployment and modify it
# Unfortunately requires us to add role to use the aws_lambda_function, even though it already exists
resource "aws_lambda_function" "nest_cli" {
  function_name = local.lambda_function_name
  role          = aws_iam_role.iam_for_lambda.arn
  filename      = "s3_bucket"
  handler       = "main.handler"

  runtime = "nodejs18.x"

  # environment {
  #   variables = {
  #     foo = "bar"
  #   }
  # }
}

# This provider gets a current instance on AWS
resource "aws_instance" "nest_cli_lambda" {
  ami = aws_lambda_function.nest_cli.id
}


output "lambda_lambda_instance" {
  value = aws_instance.nest_cli_lambda
}
