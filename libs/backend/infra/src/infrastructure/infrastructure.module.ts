import { Module } from '@nestjs/common'
import { AuthModule, AwsModule, LoggerModule } from './adapters'
import { ApolloClientModule } from './ports/apollo-client'
import { DgraphModule } from './ports/dgraph'
import { GraphqlSchemaModule } from './ports/graphql-schema'
import { GraphqlServerModule } from './ports/graphql-server'

@Module({
  imports: [
    AwsModule,
    LoggerModule,
    ApolloClientModule,
    GraphqlSchemaModule,
    GraphqlServerModule,
    AuthModule,
    DgraphModule,
  ],
})
export class InfrastructureModule {}
