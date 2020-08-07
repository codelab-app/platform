import { Injectable } from '@nestjs/common'
import { JSONSchema7 } from 'json-schema'

@Injectable()
export class SchemaService {
  componentsJsonSchema(): JSONSchema7 {
    return {}
  }
}
