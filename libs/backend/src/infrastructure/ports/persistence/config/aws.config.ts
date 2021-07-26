import { get } from 'env-var'

export interface AwsConfig {
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  AWS_REGION: string
  AWS_BUCKET_NAME: string
}

export const awsConfig: AwsConfig = {
  AWS_ACCESS_KEY_ID: get('AWS_ACCESS_KEY_ID').required().asString(),
  AWS_SECRET_ACCESS_KEY: get('AWS_SECRET_ACCESS_KEY').required().asString(),
  AWS_REGION: get('AWS_REGION').required().asString(),
  AWS_BUCKET_NAME: get('AWS_BUCKET_NAME').required().asString(),
}
