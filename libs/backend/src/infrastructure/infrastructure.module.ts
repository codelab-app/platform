import { authConfig, AuthModule } from '@codelab/modules/auth-api'
import { Module } from '@nestjs/common'
import { apolloClientConfig, ApolloClientModule } from './apollo-client'
import { CacheModule } from './cache'
import { dgraphConfig, DgraphModule } from './dgraph'
import { graphqlSchemaConfig, GraphqlSchemaModule } from './graphql-schema'
import { graphqlServerConfig, GraphqlServerModule } from './graphql-server'
import { AwsModule } from './persistence/aws'

@Module({
  imports: [
    AwsModule,
    ApolloClientModule.register(apolloClientConfig),
    GraphqlSchemaModule.register(dgraphConfig, graphqlSchemaConfig),
    GraphqlServerModule.register(graphqlServerConfig),
    CacheModule.register(),
    AuthModule.register(authConfig),
    DgraphModule.register(dgraphConfig),
  ],
  exports: [],
})
export class InfrastructureModule {}
