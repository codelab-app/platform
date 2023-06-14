locals {
  MainLambdaFunction = {
    "MainLambdaFunction" : {
      "Type" : "AWS::Lambda::Function",
      "Properties" : {
        "Code" : {
          "S3Bucket" : {
            "Ref" : "ServerlessDeploymentBucket"
          },
          "S3Key" : "serverless/codelab-nest-cli/${terraform.workspace}/1686702521845-2023-06-14T00:28:41.845Z/codelab-nest-cli.zip"
        },
        "Handler" : "dist/apps/nest-cli-serverless/main.handler",
        "Runtime" : "nodejs18.x",
        "FunctionName" : "codelab-nest-cli-${terraform.workspace}-main",
        "MemorySize" : 1024,
        "Timeout" : 6,
        "Role" : {
          "Fn::GetAtt" : ["IamRoleLambdaExecution", "Arn"]
        }
      },
      "DependsOn" : ["MainLogGroup"]
    }
  }
}
