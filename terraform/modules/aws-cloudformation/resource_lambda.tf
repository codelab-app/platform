locals {
  MainLambdaFunction = {
    "MainLambdaFunction" : {
      "Type" : "AWS::Lambda::Function",
      "Properties" : {
        "Code" : {
          "S3Bucket" : {
            "Ref" : "ServerlessDeploymentBucket"
          },
          "S3Key" : "serverless/${local.service_name}/${terraform.workspace}/1686702521845-2023-06-14T00:28:41.845Z/${local.service_name}.zip"
        },
        "Handler" : "${local.lambda_handler_path}",
        "Runtime" : "nodejs18.x",
        "FunctionName" : "${local.service_name}-${terraform.workspace}-${local.lambda_function_name}",
        "MemorySize" : 1024,
        "Timeout" : 6,
        "Role" : {
          "Fn::GetAtt" : ["IamRoleLambdaExecution", "Arn"]
        }
      },
      "DependsOn" : ["MainLogGroup"]
    }
  }
  MainLambdaVersion = {
    "MainLambdaVersion" : {
      "Type" : "AWS::Lambda::Version",
      "DeletionPolicy" : "Retain",
      "Properties" : {
        "FunctionName" : {
          "Ref" : "MainLambdaFunction"
        },
        "CodeSha256" : "LzSmQvyLdAGaiwCGn7wBH4PiFYikkpvPpAuAYkF4YjY="
      }
    }
  }
}
