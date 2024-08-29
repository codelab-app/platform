import {
  type IValidationService,
  type SchemaKinds,
  SchemaKindsMap,
} from '@codelab/shared/abstract/core'
import { schemaProvider } from '@codelab/shared/infra/schema'
import type { TSchema } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import type { AbstractStandardValidator } from 'typebox-validators'
import { StandardValidator } from 'typebox-validators'

export class ValidationService<T extends TSchema>
  implements IValidationService<T>
{
  constructor(private kind: keyof typeof SchemaKinds, tSchema: T) {
    /**
     * Add our custom schema to provider
     */
    this.schema.register(kind, tSchema)
    /**
     * This custom validator allows custom error messages
     */
    this.validator = new StandardValidator(tSchema)
  }

  get tSchema(): T {
    return SchemaKindsMap[this.kind] as T
  }

  asserts(data: Readonly<unknown>) {
    this.schema.assertHasRegistry(this.kind)

    const errors = [...Value.Errors(this.tSchema, data)]

    if (errors.length) {
      console.error(errors)

      throw new Error(`Validation error for ${this.tSchema}`)
    }

    // return this.validator.assert(data)
  }

  decode(data: unknown) {
    return Value.Decode<T>(this.tSchema, data)
  }

  validate(data: Readonly<unknown>) {
    this.schema.assertHasRegistry(this.kind)

    return Value.Check(this.tSchema, data)
    // return this.validator.test(data)
  }

  private schema = schemaProvider

  private validator: AbstractStandardValidator<T>
}
