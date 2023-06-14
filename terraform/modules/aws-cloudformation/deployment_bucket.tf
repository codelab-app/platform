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
}
