import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApolloClientService } from './apollo-client.service'
import { apolloClientConfig } from './config/apollo-client.config'

@Module({
  imports: [ConfigModule.forFeature(apolloClientConfig)],
  providers: [ApolloClientService],
  exports: [ApolloClientService],
})
export class ApolloClientModule {}
