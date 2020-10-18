import { Module } from '@nestjs/common'
import { GraphQLFederationModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/config'
import {
  NEO4J_DRIVER_PROVIDER,
  Neo4jDriversModule,
} from '@codelab/api/drivers/neo4j'
import { NODE_SCHEMA_PROVIDER, NodeModule } from '@codelab/api/schema/node'

@Module({
  imports: [
    ConfigModule,
    GraphQLFederationModule.forRootAsync({
      imports: [Neo4jDriversModule, NodeModule],
      inject: [NEO4J_DRIVER_PROVIDER, NODE_SCHEMA_PROVIDER],
      useFactory: (driver, schema) => ({
        schema,
        context: ({ req }) => ({
          driver,
          req,
        }),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
