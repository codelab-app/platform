import { awsConfig } from '../config/aws.config'
import { AwsTokens } from './aws.tokens'
import { AwsLambdaService } from './aws-lambda.service'
import { AwsS3Service } from './aws-s3.service'

export const awsProviders = [
  {
    provide: AwsTokens.S3,
    useFactory: () =>
      new AwsS3Service({
        region: awsConfig.AWS_REGION,
        credentials: {
          accessKeyId: awsConfig.AWS_ACCESS_KEY_ID,
          secretAccessKey: awsConfig.AWS_SECRET_ACCESS_KEY,
        },
      }),
  },
  {
    provide: AwsTokens.Lambda,
    useFactory: () =>
      new AwsLambdaService({
        region: awsConfig.AWS_REGION,
        credentials: {
          accessKeyId: awsConfig.AWS_ACCESS_KEY_ID,
          secretAccessKey: awsConfig.AWS_SECRET_ACCESS_KEY,
        },
      }),
  },
]
