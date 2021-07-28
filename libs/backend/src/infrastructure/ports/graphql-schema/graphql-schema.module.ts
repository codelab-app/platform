import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { dgraphConfig } from '../dgraph'
import { graphqlSchemaConfig } from './config/graphql-schema.config'
import { GraphqlSchemaService } from './graphql-schema.service'

@Module({
  imports: [
    ConfigModule.forFeature(dgraphConfig),
    ConfigModule.forFeature(graphqlSchemaConfig),
  ],
  providers: [GraphqlSchemaService],
  exports: [GraphqlSchemaService],
})
export class GraphqlSchemaModule {}
