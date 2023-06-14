locals {
  resource_path = "${path.root}/../../modules/aws-cloudformation/resources/"
  output_path   = "${path.root}/../../modules/aws-cloudformation/outputs/"
}

resource "aws_cloudformation_stack" "nestjs-cli-app" {
  name = "nestjs-cli-app"

  parameters = {
  }


  template_body = jsonencode({
    AWSTemplateFormatVersion = "2010-09-09"

    Description = "The AWS CloudFormation template for this Serverless application"

    Parameters = {}

    Resources = merge(
      # path.root is root module path
      jsondecode(file("${local.resource_path}/ServerlessDeploymentBucket.json")),
      jsondecode(file("${local.resource_path}/ServerlessDeploymentBucketPolicy.json")),
      jsondecode(file("${local.resource_path}/MainLogGroup.json")),
      jsondecode(file("${local.resource_path}/IamRoleLambdaExecution.json")),
      local.MainLambdaFunction,
      # jsondecode(
      #   templatefile(
      #     file("${local.resource_path}/MainLambdaFunction.json"),
      #     { workspace = terraform.workspace }
      #   ),
      # ),
      jsondecode(file("${local.resource_path}/MainLambdaVersion.json"))
    )

    Outputs = merge(
      jsondecode(file("${local.output_path}/ServerlessDeploymentBucketName.json")),
      jsondecode(file("${local.output_path}/MainLambdaFunctionQualifiedArn.json")),
    )
  })

  capabilities = ["CAPABILITY_NAMED_IAM"]
}
