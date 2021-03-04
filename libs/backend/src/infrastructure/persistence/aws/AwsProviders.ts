import { awsConfig } from '../config/AwsS3Config'
import { AwsDITokens } from './AwsDITokens'
import { AwsLambdaService } from './AwsLambdaService'
import { AwsS3Service } from './AwsS3Service'

export const awsProviders = [
  {
    provide: AwsDITokens.S3,
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
    provide: AwsDITokens.Lambda,
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
