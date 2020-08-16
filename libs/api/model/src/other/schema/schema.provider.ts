import { JSONSchema7 } from 'json-schema'
import { FactoryProvider } from '@nestjs/common'
import { SchemaService } from './schema.service'

export const JSON_SCHEMA_REPOSITORY = 'JSON_SCHEMA_REPOSITORY'

/**
 * Service to fetch the json schema data
 */
export const jsonSchemaRepositoryProvider: FactoryProvider<JSONSchema7> = {
  provide: JSON_SCHEMA_REPOSITORY,
  useFactory: (schemaService: SchemaService) => {
    return schemaService.jsonSchemaData
  },
  inject: [SchemaService],
}
