import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { apolloClientProvider } from './apollo-client.provider'
import { apolloClientConfig } from './config/apollo-client.config'
import { ApolloClientTokens } from './config/apollo-client.tokens'

@Global()
@Module({
  imports: [ConfigModule.forFeature(apolloClientConfig)],
  providers: [apolloClientProvider],
  exports: [ApolloClientTokens.ApolloClientProvider],
})
export class ApolloClientModule {}
