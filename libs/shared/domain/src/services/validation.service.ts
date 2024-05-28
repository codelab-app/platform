import {
  type IValidationService,
  type SchemaKinds,
  SchemaKindsMap,
} from '@codelab/shared/abstract/core'
import {
  type ISchemaProvider,
  schemaProvider,
} from '@codelab/shared/infra/schema'
import { Value } from '@sinclair/typebox/value'
import type { Schema } from 'ajv'

export class ValidationService<T extends Schema>
  implements IValidationService<T>
{
  constructor(private kind: keyof typeof SchemaKinds, tSchema: T) {
    this.schema.register(kind, tSchema)
  }

  asserts(data: unknown) {
    const tSchema = SchemaKindsMap[this.kind]

    Value.Decode(tSchema, data)
  }

  validate(data: unknown) {
    const tSchema = SchemaKindsMap[this.kind]

    return Value.Check(tSchema, data)
  }

  private schema: ISchemaProvider = schemaProvider
}
