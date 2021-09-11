import { AwsConfig, awsConfig } from './config/aws.config'
import { AwsTokens } from './config/aws.tokens'
import { AwsLambdaService } from './lambda/aws-lambda.service'
import { AwsS3Service } from './s3/aws-s3.service'

export const awsProviders = [
  {
    provide: AwsTokens.S3,
    useFactory: (_awsConfig: AwsConfig) =>
      new AwsS3Service({
        region: _awsConfig.awsRegion,
        credentials: {
          accessKeyId: _awsConfig.awsAccessKeyId,
          secretAccessKey: _awsConfig.awsSecretAccessKey,
        },
      }),
    inject: [awsConfig.KEY],
  },
  {
    provide: AwsTokens.Lambda,
    useFactory: (_awsConfig: AwsConfig) =>
      new AwsLambdaService({
        region: _awsConfig.awsRegion,
        credentials: {
          accessKeyId: _awsConfig.awsAccessKeyId,
          secretAccessKey: _awsConfig.awsSecretAccessKey,
        },
      }),
    inject: [awsConfig.KEY],
  },
]
