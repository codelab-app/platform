module "aws_module" {
  source = "../../modules/aws-cloudformation"

  aws_access_token = var.AWS_ACCESS_TOKEN
  aws_secret_key   = var.AWS_SECRET_KEY
}


# Needs to be at root module
# import {
#   to = aws_module.lambda_lambda_instance
#   id = "codelab-cli-dev-main"
# }


# resource "aws_lambda_function" "nest_cli" {
#   function_name = local.lambda_function_name
# }
