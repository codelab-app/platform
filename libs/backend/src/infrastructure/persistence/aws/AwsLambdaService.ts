import {
  CreateFunctionCommand,
  CreateFunctionRequest,
  DeleteFunctionCommand,
  DeleteFunctionRequest,
  InvocationRequest,
  InvokeCommand,
  LambdaClient,
  UpdateFunctionCodeCommand,
  UpdateFunctionCodeRequest,
} from '@aws-sdk/client-lambda'
import { Lambda } from '@prisma/client'

export class AwsLambdaService extends LambdaClient {
  bucketPrefix = 'codelab-lambda'

  async createFunction(lambda: Lambda) {
    const params: CreateFunctionRequest = {
      Code: {
        S3Bucket: `${this.bucketPrefix}-${lambda.appId}`, // BUCKET_NAME
        S3Key: lambda.id, // ZIP_FILE_NAME
        // ZipFile: ''
      },
      FunctionName: lambda.id,
      Handler: `${lambda.name}.handler`,
      // https://stackoverflow.com/questions/37498124/accessdeniedexception-user-is-not-authorized-to-perform-lambdainvokefunction
      Role: 'arn:aws:iam::810113963961:role/codelab-aws-lambda',

      // Role:
      //   'arn:aws:s3:::codelab-lambda-2ddb4e68-7b61-4c0b-97b7-346ccc56354e/function.zip',
      // IAM_ROLE_ARN; e.g., arn:aws:iam::650138640062:role/v3-lambda-tutorial-lambda-role
      Runtime: 'nodejs14.x',
      Description: `${lambda.name}`,
    }

    try {
      const data = await this.send(new CreateFunctionCommand(params))

      console.log('Success', data)
    } catch (err) {
      console.log('Error', err)
    }
  }

  async removeFunction(lambda: Lambda) {
    const params: DeleteFunctionRequest = {
      FunctionName: lambda.id,
    }

    try {
      const data = await this.send(new DeleteFunctionCommand(params))

      console.log('Success', data)
    } catch (err) {
      console.log('Error', err)
    }
  }

  async updateFunction(lambda: Lambda) {
    const params: UpdateFunctionCodeRequest = {
      S3Bucket: `${this.bucketPrefix}-${lambda.appId}`,
      S3Key: lambda.id,
      FunctionName: lambda.id,
    }

    try {
      const data = await this.send(new UpdateFunctionCodeCommand(params))

      console.log('Success', data)
    } catch (err) {
      console.log('Error', err)
    }
  }

  async executeFunction(lambda: Lambda) {
    const params: InvocationRequest = {
      FunctionName: lambda.id,
      // Payload: {}
    }

    try {
      const result = await this.send(new InvokeCommand(params))

      const responseObject = JSON.parse(
        new TextDecoder('utf-8').decode(result.Payload) || '{}',
      )

      console.log('Success', result, responseObject)
    } catch (err) {
      console.log('Error', err)
    }
  }
}
