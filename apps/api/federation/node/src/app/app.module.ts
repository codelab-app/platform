import { resolve } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLSchema } from 'graphql'
import { augmentSchema } from 'neo4j-graphql-js'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/providers/config'
import { LoggerModule } from '@codelab/api/providers/logger'
import {
  GraphqlNodeModule,
  NEO4J_DRIVERS_PROVIDER,
  Neo4jConnectorModule,
  Neo4jSchemaService,
} from '@codelab/api/services/node'

const schemaFile = resolve(
  process.cwd(),
  'libs/state/apollo/src/generated/node.schema.graphql',
)

console.log(schemaFile)

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    // Main
    GraphQLModule.forRootAsync({
      imports: [Neo4jConnectorModule, GraphqlNodeModule],
      inject: [NEO4J_DRIVERS_PROVIDER, Neo4jSchemaService],
      useFactory: (driver: Driver, schemaService: Neo4jSchemaService) => {
        const neo4jDirectives: Array<string> = augmentSchema(
          new GraphQLSchema({}),
        ).getDirectives()

        // console.log(
        //   Object.keys(neo4jDirectives[0]),
        //   Object.values(neo4jDirectives[0]),
        // )

        // const neo4jSchemaDirectives = neo4jDirectives.reduce(
        //   (acc, directive: any) => {
        //     const { name } = directive
        //     const { astNode } = directive

        //     // console.log(name, astNode)

        //     return astNode
        //       ? {
        //           ...acc,
        //           [name]: astNode,
        //         }
        //       : acc
        //   },
        //   {},
        // )

        // console.log(neo4jSchemaDirectives)

        return {
          include: [GraphqlNodeModule],
          // schemaDirectives: neo4jSchemaDirectives,
          autoSchemaFile: schemaFile,
          transformSchema: schemaService.transformSchema,
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
