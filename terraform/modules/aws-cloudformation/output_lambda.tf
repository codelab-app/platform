locals = {
  MainLambdaFunctionQualifiedArn = {
    "MainLambdaFunctionQualifiedArn" : {
      "Description" : "Current Lambda function version",
      "Value" : {
        "Ref" : "MainLambdaVersion2ppqOGoTNhcdxylbBMUSHUhrfKhlIQ8AyMWGRZGo4M"
      },
      "Export" : {
        "Name" : "sls-${local.service_name}-${terraform.workspace}-MainLambdaFunctionQualifiedArn"
      }
    }
  }

}
