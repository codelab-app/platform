locals = {
  ServerlessDeploymentBucketName = {
    "ServerlessDeploymentBucketName" : {
      "Value" : {
        "Ref" : "ServerlessDeploymentBucket"
      },
      "Export" : {
        "Name" : "sls-${local.service_name}-${terraform.workspace}-ServerlessDeploymentBucketName"
      }
    }
  }
}
