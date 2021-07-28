import { Module } from '@nestjs/common'
import { AuthModule, AwsModule, LoggerModule } from './adapters'
import { ApolloClientModule } from './ports/apollo-client'
import { auth0Config } from './ports/auth0'
import { DgraphModule } from './ports/dgraph'
import { GraphqlSchemaModule } from './ports/graphql-schema'
import {
  graphqlServerConfig,
  GraphqlServerModule,
} from './ports/graphql-server'

@Module({
  imports: [
    AwsModule,
    LoggerModule,
    ApolloClientModule,
    GraphqlSchemaModule,
    GraphqlServerModule.register(graphqlServerConfig),
    AuthModule.register(auth0Config),
    DgraphModule,
  ],
})
export class InfrastructureModule {}
