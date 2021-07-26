import { Module } from '@nestjs/common'
import { AuthModule, LoggerModule } from './adapters'
import { apolloClientConfig, ApolloClientModule } from './ports/apollo-client'
import { auth0Config } from './ports/auth0'
import { dgraphConfig, DgraphModule } from './ports/dgraph'
import {
  graphqlSchemaConfig,
  GraphqlSchemaModule,
} from './ports/graphql-schema'
import {
  graphqlServerConfig,
  GraphqlServerModule,
} from './ports/graphql-server'
import { AwsModule } from './ports/persistence/aws'

@Module({
  imports: [
    AwsModule,
    LoggerModule,
    ApolloClientModule.register(apolloClientConfig),
    GraphqlSchemaModule.register(dgraphConfig, graphqlSchemaConfig),
    GraphqlServerModule.register(graphqlServerConfig),
    AuthModule.register(auth0Config),
    DgraphModule.register(dgraphConfig),
  ],
})
export class InfrastructureModule {}
