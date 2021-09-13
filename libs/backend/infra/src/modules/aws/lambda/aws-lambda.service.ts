import {
  CreateFunctionCommand,
  CreateFunctionRequest,
  DeleteFunctionCommand,
  DeleteFunctionRequest,
  GetFunctionCommand,
  InvocationRequest,
  InvokeCommand,
  LambdaClient,
  UpdateFunctionCodeCommand,
  UpdateFunctionCodeRequest,
} from '@aws-sdk/client-lambda'
import { CloudFunctionsRepository } from '../../index'
import { Lambda } from '../lambda.interface'

export interface LambdaPayload {
  [key: string]: any
}

export class AwsLambdaService
  extends LambdaClient
  implements CloudFunctionsRepository<Lambda>
{
  async createFunction(bucketId: string, lambda: Lambda) {
    const params: CreateFunctionRequest = {
      Code: {
        S3Bucket: bucketId, // BUCKET_NAME
        S3Key: lambda.id, // ZIP_FILE_NAME
        // ZipFile: ''
      },
      Layers: ['arn:aws:lambda:us-west-1:810113963961:layer:axios:1'],
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

      return data
    } catch (err) {
      // console.error(err)

      return
    }
  }

  async removeFunction(lambda: Pick<Lambda, 'id'>) {
    const params: DeleteFunctionRequest = {
      FunctionName: lambda.id,
    }

    try {
      const data = await this.send(new DeleteFunctionCommand(params))

      return data
    } catch (err) {
      // console.log('Error', err)

      return
    }
  }

  async getFunction(lambda: Lambda) {
    const params: DeleteFunctionRequest = {
      FunctionName: lambda.id,
    }

    try {
      const data = await this.send(new GetFunctionCommand(params))

      return data
    } catch (err) {
      // console.log('Error', err)

      return
    }
  }

  async updateFunction(bucketId: string, lambda: Lambda) {
    const params: UpdateFunctionCodeRequest = {
      S3Bucket: bucketId,
      S3Key: lambda.id,
      FunctionName: lambda.id,
    }

    try {
      const data = await this.send(new UpdateFunctionCodeCommand(params))

      return data
    } catch (err) {
      // console.error(err)

      return
    }
  }

  /**
   *
   * @param lambda
   * @param payload The json input to your lambda function
   * @returns
   */
  async executeFunction(lambda: Lambda, payload?: LambdaPayload) {
    const params: InvocationRequest = {
      FunctionName: lambda.id,
      Payload: new TextEncoder().encode(JSON.stringify(payload)),
    }

    try {
      const result = await this.send(new InvokeCommand(params))

      const responseObject = JSON.parse(
        new TextDecoder().decode(result.Payload) || '{}',
      )

      // console.log('Success', result, responseObject)

      return responseObject
    } catch (err) {
      console.log('Error', err)
    }
  }
}
