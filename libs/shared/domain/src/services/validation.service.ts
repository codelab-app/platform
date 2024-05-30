import {
  type IValidationService,
  type SchemaKinds,
  SchemaKindsMap,
} from '@codelab/shared/abstract/core'
import {
  type ISchemaProvider,
  schemaProvider,
} from '@codelab/shared/infra/schema'
import type { StaticDecode, TSchema } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import type { Schema } from 'ajv'

export class ValidationService<T extends TSchema>
  implements IValidationService<T>
{
  constructor(private kind: keyof typeof SchemaKinds, tSchema: T) {
    this.schema.register(kind, tSchema)
  }

  get tSchema(): T {
    return SchemaKindsMap[this.kind] as T
  }

  asserts(data: unknown) {
    this.schema.assertHasRegistry(this.kind)

    console.log(this.tSchema, data)

    Value.Decode(this.tSchema, data)
  }

  decode(data: unknown) {
    return Value.Decode<T>(this.tSchema, data)
  }

  validate(data: unknown) {
    this.schema.assertHasRegistry(this.kind)

    return Value.Check(this.tSchema, data)
  }

  private schema = schemaProvider
}
