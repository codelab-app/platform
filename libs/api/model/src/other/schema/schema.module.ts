import { Module } from '@nestjs/common'
import {
  jsonSchemaRepositoryProvider,
  JSON_SCHEMA_REPOSITORY,
} from './schema.provider'
import { SchemaService } from './schema.service'

@Module({
  providers: [SchemaService, jsonSchemaRepositoryProvider],
  exports: [JSON_SCHEMA_REPOSITORY],
})
export class SchemaModule {}
