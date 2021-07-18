import { Module } from '@nestjs/common'
import { AuthModule } from '../adapters'
import { apolloClientConfig, ApolloClientModule } from './apollo-client'
import { auth0Config } from './auth0'
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
    AuthModule.register(auth0Config),
    DgraphModule.register(dgraphConfig),
  ],
})
export class InfrastructureModule {
  // constructor(private seedDbService: SeedDbService) {}
  // async onModuleInit() {
  //   await this.seedDbService.seedDB()
  // }
}
