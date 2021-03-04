import { Global, Module } from '@nestjs/common'
import { AwsDITokens } from './AwsDITokens'
import { awsProviders } from './AwsProviders'

@Global()
@Module({
  providers: [...awsProviders],
  exports: [AwsDITokens.S3, AwsDITokens.Lambda],
})
export class AwsModule {}
