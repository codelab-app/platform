import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Driver } from 'neo4j-driver'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApiConfigTypes, ConfigModule } from '@codelab/api/providers/config'
import { LoggerModule } from '@codelab/api/providers/logger'
import {
  GraphqlNodeModule,
  NEO4J_DRIVERS_PROVIDER,
  Neo4jConnectorModule,
  Neo4jSchemaService,
} from '@codelab/api/services/node'

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    // Main code
    ClientsModule.registerAsync([
      {
        name: `${ApiConfigTypes.GRPC_PROPS_PACKAGE}`,
        useFactory: () => {
          return {
            transport: Transport.GRPC,
            options: {
              package: 'api.federation.props',
              protoPath: join(
                process.cwd(),
                'apps/api/federation/props/src/proto/props.proto',
              ),
            },
          }
        },
      },
    ]),
    // GraphqlNodeModule, // Adding only for Query root
    GraphQLModule.forRootAsync({
      imports: [Neo4jConnectorModule, GraphqlNodeModule],
      inject: [NEO4J_DRIVERS_PROVIDER, Neo4jSchemaService],
      useFactory: (driver: Driver, schemaService: Neo4jSchemaService) => {
        return {
          include: [GraphqlNodeModule],
          autoSchemaFile: true,
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
