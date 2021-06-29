import {
  apolloClientConfig,
  ApolloClientModule,
  auth0Config,
  AwsModule,
  dgraphConfig,
  DgraphModule,
  graphqlSchemaConfig,
  GraphqlSchemaModule,
  graphqlServerConfig,
  GraphqlServerModule,
} from '@codelab/backend'
import { AuthModule } from '@codelab/backend/adapters'
import { Global, Module } from '@nestjs/common'

@Module({
  imports: [
    AwsModule,
    ApolloClientModule.register(apolloClientConfig),
    GraphqlSchemaModule.register(dgraphConfig, graphqlSchemaConfig),
    GraphqlServerModule.register(graphqlServerConfig),
    AuthModule.register(auth0Config),
    DgraphModule.register(dgraphConfig),
  ],
})
export class InfrastructureModule {}
