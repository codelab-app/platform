locals {
  MainLogGroup = {
    "MainLogGroup" : {
      "Type" : "AWS::Logs::LogGroup",
      "Properties" : {
        "LogGroupName" : "/aws/lambda/${local.service_name}-${terraform.workspace}-main"
      }
    }
  }
}
