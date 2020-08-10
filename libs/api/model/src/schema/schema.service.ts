import { Injectable } from '@nestjs/common'
import { JSONSchema7 } from 'json-schema'
import { appSchema } from './schema.data'

@Injectable()
export class SchemaService {
  get jsonSchemaData(): JSONSchema7 {
    return appSchema
  }
}
