import { Module } from '@nestjs/common'
import {
  GRAPHQL_SCHEMA_PROVIDER,
  graphqlSchemaProvider,
} from './schema.provider'

@Module({
  providers: [graphqlSchemaProvider],
  exports: [GRAPHQL_SCHEMA_PROVIDER],
})
export class SchemaModule {}
