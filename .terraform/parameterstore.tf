data "aws_caller_identity" "current" { }

resource "aws_ssm_parameter" "dgraph_graphql_endpoint" {
  name        = "/${var.app_name}/dgraph/graphql_endpoint"
  description = "CODELAB_DGRAPH_GRAPHQL_ENDPOINT"
  type        = "String"
  value       = var.dgraph_graphql_endpoint
}

resource "aws_ssm_parameter" "dgraph_endpoint" {
  name        = "/${var.app_name}/dgraph/endpoint"
  description = "CODELAB_DGRAPH_ENDPOINT"
  type        = "String"
  value       = var.dgraph_endpoint
}

resource "aws_ssm_parameter" "aws_access_key" {
  name        = "/${var.app_name}/aws/access_key"
  description = "AWS_ACCESS_KEY_ID"
  type        = "SecureString"
  value       = var.aws_access_key
}

resource "aws_ssm_parameter" "aws_secret_key" {
  name        = "/${var.app_name}/aws/secret_key"
  description = "AWS_SECRET_ACCESS_KEY"
  type        = "SecureString"
  value       = var.aws_secret_key
}

resource "aws_ssm_parameter" "aws_bucket" {
  name        = "/${var.app_name}/aws/bucket"
  description = "AWS_BUCKET_NAME"
  type        = "String"
  value       = var.aws_bucket
}

resource "aws_ssm_parameter" "auth0_secret" {
  name        = "/${var.app_name}/auth0/secret"
  description = "AUTH0_SECRET"
  type        = "SecureString"
  value       = var.auth0_secret
}

resource "aws_ssm_parameter" "auth0_baseurl" {
  name        = "/${var.app_name}/auth0/baseurl"
  description = "AUTH0_BASE_URL"
  type        = "String"
  value       = var.auth0_baseurl
}

resource "aws_ssm_parameter" "auth0_issuer_baseurl" {
  name        = "/${var.app_name}/auth0/issuer_baseurl"
  description = "AUTH0_ISSUER_BASE_URL"
  type        = "String"
  value       = var.auth0_issuer_baseurl
}

resource "aws_ssm_parameter" "auth0_client_id" {
  name        = "/${var.app_name}/auth0/client_id"
  description = "AUTH0_CLIENT_ID"
  type        = "SecureString"
  value       = var.auth0_client_id
}

resource "aws_ssm_parameter" "auth0_client_secret" {
  name        = "/${var.app_name}/auth0/client_secret"
  description = "AUTH0_CLIENT_SECRET"
  type        = "SecureString"
  value       = var.auth0_client_secret
}

resource "aws_ssm_parameter" "auth0_audience" {
  name        = "/${var.app_name}/auth0/audience"
  description = "AUTH0_AUDIENCE"
  type        = "SecureString"
  value       = var.auth0_audience
}

resource "aws_ssm_parameter" "auth0_api_client_id" {
  name        = "/${var.app_name}/auth0/api_client_id"
  description = "AUTH0_API_CLIENT_ID"
  type        = "SecureString"
  value       = var.auth0_api_client_id
}

resource "aws_ssm_parameter" "auth0_api_client_secret" {
  name        = "/${var.app_name}/auth0/api_client_secret"
  description = "AUTH0_API_CLIENT_SECRET"
  type        = "SecureString"
  value       = var.auth0_api_client_secret
}

resource "aws_iam_role_policy" "secret_policy_parameterstore" {
  name        = "policy-parameterstore"
  role        = aws_iam_role.ecs_task_execution_role.id
  policy      = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": [
          "ssm:GetParameters"
        ],
        "Effect": "Allow",
        "Resource": "arn:aws:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:parameter/${var.app_name}/*"
      },
      {
        "Action": [
          "ssm:DescribeParameters"
        ],
        "Effect": "Allow",
        "Resource": "*"
      }
    ]
  }
  EOF
}
