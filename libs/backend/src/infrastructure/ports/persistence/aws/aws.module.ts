import { Global, Module } from '@nestjs/common'
import { awsProviders } from './aws.providers'
import { AwsTokens } from './aws.tokens'

@Global()
@Module({
  providers: [...awsProviders],
  exports: [AwsTokens.S3, AwsTokens.Lambda],
})
export class AwsModule {}
