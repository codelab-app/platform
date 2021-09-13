import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { awsProviders } from './aws.providers'
import { awsConfig } from './config/aws.config'
import { AwsTokens } from './config/aws.tokens'

@Global()
@Module({
  imports: [ConfigModule.forFeature(awsConfig)],
  providers: [...awsProviders],
  exports: [AwsTokens.S3, AwsTokens.Lambda],
})
export class AwsModule {}
