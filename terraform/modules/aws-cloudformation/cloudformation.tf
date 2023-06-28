locals {
  resource_path        = "${path.root}/../../modules/aws-cloudformation/resources/"
  output_path          = "${path.root}/../../modules/aws-cloudformation/outputs/"
  lambda_function_name = "main"
  lambda_handler_path  = "dist/app/cli-serverless/main.handler"

  # These are cloudformation resource names
  i_am_role_lambda_execution        = "IamRoleLambdaExecution"
  serverless_deployment_bucket_name = "ServerlessDeploymentBucketName"
  serverless_deployment_bucket      = "ServerlessDeploymentBucket"
}

resource "aws_cloudformation_stack" "nestjs-cli-app" {
  count = 0
  name  = "nestjs-cli-app"

  parameters = {
  }


  template_body = jsonencode({
    AWSTemplateFormatVersion = "2010-09-09"

    Description = "The AWS CloudFormation template for this Serverless application"

    Parameters = {}

    # path.root is root module path
    Resources = jsonencode({
      "ServerlessDeploymentBucket" : {
        "Type" : "AWS::S3::Bucket",
        "Properties" : {
          "BucketEncryption" : {
            "ServerSideEncryptionConfiguration" : [
              {
                "ServerSideEncryptionByDefault" : {
                  "SSEAlgorithm" : "AES256"
                }
              }
            ]
          }
        }
      },
      "ServerlessDeploymentBucketPolicy" : {
        "Type" : "AWS::S3::BucketPolicy",
        "Properties" : {
          "Bucket" : {
            "Ref" : "ServerlessDeploymentBucket"
          },
          "PolicyDocument" : {
            "Statement" : [
              {
                "Action" : "s3:*",
                "Effect" : "Deny",
                "Principal" : "*",
                "Resource" : [
                  {
                    "Fn::Join" : [
                      "",
                      [
                        "arn:",
                        {
                          "Ref" : "AWS::Partition"
                        },
                        ":s3:::",
                        {
                          "Ref" : "ServerlessDeploymentBucket"
                        },
                        "/*"
                      ]
                    ]
                  },
                  {
                    "Fn::Join" : [
                      "",
                      [
                        "arn:",
                        {
                          "Ref" : "AWS::Partition"
                        },
                        ":s3:::",
                        {
                          "Ref" : "ServerlessDeploymentBucket"
                        }
                      ]
                    ]
                  }
                ],
                "Condition" : {
                  "Bool" : {
                    "aws:SecureTransport" : false
                  }
                }
              }
            ]
          }
        }
      },
      "MainLogGroup" : {
        "Type" : "AWS::Logs::LogGroup",
        "Properties" : {
          "LogGroupName" : "/aws/lambda/codelab-cli-dev-main"
        }
      },
      "IamRoleLambdaExecution" : {
        "Type" : "AWS::IAM::Role",
        "Properties" : {
          "AssumeRolePolicyDocument" : {
            "Version" : "2012-10-17",
            "Statement" : [
              {
                "Effect" : "Allow",
                "Principal" : {
                  "Service" : ["lambda.amazonaws.com"]
                },
                "Action" : ["sts:AssumeRole"]
              }
            ]
          },
          "Policies" : [
            {
              "PolicyName" : {
                "Fn::Join" : ["-", ["codelab-cli", "dev", "lambda"]]
              },
              "PolicyDocument" : {
                "Version" : "2012-10-17",
                "Statement" : [
                  {
                    "Effect" : "Allow",
                    "Action" : [
                      "logs:CreateLogStream",
                      "logs:CreateLogGroup",
                      "logs:TagResource"
                    ],
                    "Resource" : [
                      {
                        "Fn::Sub" : "arn:$${AWS::Partition}:logs:$${AWS::Region}:$${AWS::AccountId}:log-group:/aws/lambda/codelab-cli-dev*:*"
                      }
                    ]
                  },
                  {
                    "Effect" : "Allow",
                    "Action" : ["logs:PutLogEvents"],
                    "Resource" : [
                      {
                        "Fn::Sub" : "arn:$${AWS::Partition}:logs:$${AWS::Region}:$${AWS::AccountId}:log-group:/aws/lambda/codelab-cli-dev*:*:*"
                      }
                    ]
                  }
                ]
              }
            }
          ],
          "Path" : "/",
          "RoleName" : {
            "Fn::Join" : [
              "-",
              [
                "codelab-cli",
                "dev",
                {
                  "Ref" : "AWS::Region"
                },
                "lambdaRole"
              ]
            ]
          }
        }
      },
      "MainLambdaFunction" : {
        "Type" : "AWS::Lambda::Function",
        "Properties" : {
          "Code" : {
            "S3Bucket" : {
              "Ref" : "ServerlessDeploymentBucket"
            },
            "S3Key" : "serverless/codelab-cli/dev/1686797125055-2023-06-15T02:45:25.055Z/codelab-cli.zip"
          },
          "Handler" : "dist/apps/cli-serverless/main.handler",
          "Runtime" : "nodejs18.x",
          "FunctionName" : "codelab-cli-dev-main",
          "MemorySize" : 1024,
          "Timeout" : 6,
          "Role" : {
            "Fn::GetAtt" : ["IamRoleLambdaExecution", "Arn"]
          }
        },
        "DependsOn" : ["MainLogGroup"]
      },
      "MainLambdaVersion2ppqOGoTNhcdxylbBMUSHUhrfKhlIQ8AyMWGRZGo4M" : {
        "Type" : "AWS::Lambda::Version",
        "DeletionPolicy" : "Retain",
        "Properties" : {
          "FunctionName" : {
            "Ref" : "MainLambdaFunction"
          },
          "CodeSha256" : "LzSmQvyLdAGaiwCGn7wBH4PiFYikkpvPpAuAYkF4YjY="
        }
    } }),

    Outputs = jsonencode({
      "ServerlessDeploymentBucketName" : {
        "Value" : {
          "Ref" : "ServerlessDeploymentBucket"
        },
        "Export" : {
          "Name" : "sls-codelab-cli-dev-ServerlessDeploymentBucketName"
        }
      },
      "MainLambdaFunctionQualifiedArn" : {
        "Description" : "Current Lambda function version",
        "Value" : {
          "Ref" : "MainLambdaVersion2ppqOGoTNhcdxylbBMUSHUhrfKhlIQ8AyMWGRZGo4M"
        },
        "Export" : {
          "Name" : "sls-codelab-cli-dev-MainLambdaFunctionQualifiedArn"
        }
      }

    })
  })

  capabilities = ["CAPABILITY_NAMED_IAM"]
}
