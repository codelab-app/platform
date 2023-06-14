# 1. Create role
resource "aws_iam_role" "iam_for_lambda" {
  name = var.lambda_function_name
  # Which policy does this role take on
  assume_role_policy = data.aws_iam_policy_document.policy_for_lambda.json
}

# 2. Create policy
# Policy will be assigned with "aws_iam_role_policy_attachment" resource
data "aws_iam_policy_document" "policy_for_lambda" {
}
