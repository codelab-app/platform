import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { AwsTokens } from './aws.tokens'

export interface AwsConfig {
  awsAccessKeyId: string
  awsSecretAccessKey: string
  awsRegion: string
  awsBucketName: string
}

export const awsConfig = registerAs<AwsConfig>(
  AwsTokens.AwsConfig.toString(),
  () => ({
    awsAccessKeyId: get('AWS_ACCESS_KEY_ID').required().asString(),
    awsSecretAccessKey: get('AWS_SECRET_ACCESS_KEY').required().asString(),
    awsRegion: get('AWS_REGION').required().asString(),
    awsBucketName: get('AWS_BUCKET_NAME').required().asString(),
  }),
)
