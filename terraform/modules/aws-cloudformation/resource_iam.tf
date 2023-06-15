locals = {
  IamRoleLambdaExecution = {
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
              "Fn::Join" : ["-", ["${local.service_name}", "${terraform.workspace}", "lambda"]]
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
                      "Fn::Sub" : "arn:$${AWS::Partition}:logs:$${AWS::Region}:$${AWS::AccountId}:log-group:/aws/lambda/${local.service_name}-${terraform.workspace}*:*"
                    }
                  ]
                },
                {
                  "Effect" : "Allow",
                  "Action" : ["logs:PutLogEvents"],
                  "Resource" : [
                    {
                      "Fn::Sub" : "arn:$${AWS::Partition}:logs:$${AWS::Region}:$${AWS::AccountId}:log-group:/aws/lambda/${local.service_name}-${terraform.workspace}*:*:*"
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
              "${local.service_name}",
              "${terraform.workspace}",
              {
                "Ref" : "AWS::Region"
              },
              "lambdaRole"
            ]
          ]
        }
      }
    }
  }
}
