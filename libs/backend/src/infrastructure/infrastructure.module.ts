import { Module } from '@nestjs/common'
import { AuthModule, LoggerModule } from '../adapters'
import { apolloClientConfig, ApolloClientModule } from './apollo-client'
import { auth0Config } from './auth0'
import { dgraphConfig, DgraphModule } from './dgraph'
import { graphqlSchemaConfig, GraphqlSchemaModule } from './graphql-schema'
import { graphqlServerConfig, GraphqlServerModule } from './graphql-server'
import { AwsModule } from './persistence/aws'

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
