locals {
  ServerlessDeploymentBucket = {
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
    }
  }
  ServerlessDeploymentBucketPolicy = {
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
    }
  }
}
