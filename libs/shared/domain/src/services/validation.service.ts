import {
  type IValidationService,
  type SchemaKinds,
  SchemaKindsMap,
} from '@codelab/shared/abstract/core'
import { schemaProvider } from '@codelab/shared/infra/schema'
import type { TSchema } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

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

    const errors = [...Value.Errors(this.tSchema, data)]

    if (errors.length) {
      console.error(errors)

      throw new Error(`Validation error for ${this.tSchema}`)
    }
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
