import {
  CreateFunctionCommand,
  CreateFunctionRequest,
  LambdaClient,
} from '@aws-sdk/client-lambda'

export class AwsLambdaService extends LambdaClient {
  bucketPrefix = 'codelab-lambda'

  async executeFunction(appId: string, zipFileName: string) {
    const params: CreateFunctionRequest = {
      Code: {
        S3Bucket: `${this.bucketPrefix}-${appId}`, // BUCKET_NAME
        S3Key: zipFileName, // ZIP_FILE_NAME
        // ZipFile: ''
      },
      FunctionName: 'helloWorld',
      // Handler: 'index.handler',
      // https://stackoverflow.com/questions/37498124/accessdeniedexception-user-is-not-authorized-to-perform-lambdainvokefunction
      Role: 'arn:aws:iam::810113963961:role/codelab-aws-lambda',

      // Role:
      //   'arn:aws:s3:::codelab-lambda-2ddb4e68-7b61-4c0b-97b7-346ccc56354e/function.zip',
      // IAM_ROLE_ARN; e.g., arn:aws:iam::650138640062:role/v3-lambda-tutorial-lambda-role
      Runtime: 'nodejs14.x',
      Description: 'Create Lambda function',
    }

    try {
      const data = await this.send(new CreateFunctionCommand(params))

      console.log('Success', data)
    } catch (err) {
      console.log('Error', err)
    }
  }
}
