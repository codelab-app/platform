import { Module, OnModuleInit } from '@nestjs/common'
import { AuthModule } from '../adapters'
import { apolloClientConfig, ApolloClientModule } from './apollo-client'
import { auth0Config } from './auth0'
import { dgraphConfig, DgraphModule } from './dgraph'
import { graphqlSchemaConfig, GraphqlSchemaModule } from './graphql-schema'
import { graphqlServerConfig, GraphqlServerModule } from './graphql-server'
import { AwsModule } from './persistence/aws'
import { SeedDbModule } from './seed-db/seed-db.module';
import { SeedDbService } from './seed-db/seed-db.service';

@Module({
  imports: [
    AwsModule,
    ApolloClientModule.register(apolloClientConfig),
    GraphqlSchemaModule.register(dgraphConfig, graphqlSchemaConfig),
    GraphqlServerModule.register(graphqlServerConfig),
    AuthModule.register(auth0Config),
    DgraphModule.register(dgraphConfig),
    SeedDbModule
  ],
})
export class InfrastructureModule implements OnModuleInit {

  constructor(private seedDbService: SeedDbService) {
  }

  async onModuleInit() {
    await this.seedDbService.seedDB()
  }
}
