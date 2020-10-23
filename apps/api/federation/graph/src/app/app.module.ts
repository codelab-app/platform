import { buildFederatedSchema } from '@apollo/federation'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLSchema } from 'graphql'
import { printSchema } from 'graphql/utilities'
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import { extractResolversFromSchema } from 'neo4j-graphql-js/dist/augment/resolvers'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/config'
import {
  NEO4J_DRIVER_PROVIDER,
  Neo4jDriversModule,
} from '@codelab/api/drivers/neo4j'
import { LoggerModule } from '@codelab/api/logger'
import { NodeModule } from '@codelab/api/schema/node'
import { GrpcPropsClientModule } from '@codelab/api/services/props'
@Module({
  imports: [
    GrpcPropsClientModule,
    LoggerModule,
    ConfigModule,
    NodeModule,
    GraphQLModule.forRootAsync({
      imports: [Neo4jDriversModule],
      inject: [NEO4J_DRIVER_PROVIDER],
      useFactory: (driver) => {
        return {
          include: [NodeModule],
          autoSchemaFile: true,
          // Here schema already has federation added
          transformSchema: (schema: GraphQLSchema) => {
            const resolvers = extractResolversFromSchema(schema)

            // Our user defined schema
            const typeDefs: string = printSchema(schema)

            const neo4jExtendedSchema = makeAugmentedSchema({
              resolvers,
              typeDefs,
              config: {
                isFederated: true,
              },
            })

            return buildFederatedSchema([neo4jExtendedSchema])
          },
          transformAutoSchemaFile: true,
          context: (ctx) => ({
            ...ctx,
            driver,
          }),
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
