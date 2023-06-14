variable "lambda_service_name" {
  default = "codelab-nest-cli"
}

variable "serverless_stage" {
  default = "prod"
}

variable "built_filename" {
  default = "main"
}

locals {
  lambda_function_name = "${var.lambda_service_name}-${var.serverless_stage}-${var.built_filename}"
}

resource "aws_lambda_function" "nest-cli" {
  function_name = local.lambda_function_name
  filename      = "lambda_function_payload.zip"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "main.handler"

  source_code_hash = data.archive_file.lambda.output_base64sha256

  runtime = "nodejs18.x"

  depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
    aws_cloudwatch_log_group.example,
  ]

  environment {
    variables = {
      foo = "bar"
    }
  }
}

# The archive_file is a data source provided by the Terraform's built-in archive provider.
data "archive_file" "lambda" {
  type = "zip"
  # Source file on computer
  source_file = "./codelab-nest-cli.zip"
  output_path = "lambda_function_payload.zip"
}

