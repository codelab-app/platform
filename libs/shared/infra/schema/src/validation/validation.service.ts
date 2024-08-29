import type { IValidationService } from '@codelab/shared/abstract/infra'
import { Typebox } from '@codelab/shared/abstract/typebox'
import type { TKind, TSchema } from '@sinclair/typebox'
import { StandardValidator } from 'typebox-validators'
import { AtLeastOneSchema, TAtLeastOne } from '../schema'
import { schemaProvider } from '../schema.provider'

class ValidationService implements IValidationService {
  constructor() {
    for (const [kind, schema] of this.schemaKindMap) {
      this.registerSchema(kind, schema)
    }
  }

  asserts(kind: TKind, data: Readonly<unknown>, options?: { message: string }) {
    const validator = new StandardValidator(this.tSchema(kind))

    this.schema.assertHasRegistry(kind)

    return validator.assert(data, options?.message)
  }

  validate(kind: TKind, data: Readonly<unknown>) {
    const validator = new StandardValidator(this.tSchema(kind))

    this.schema.assertHasRegistry(kind)

    return validator.test(data)
  }

  private registerSchema(kind: TKind, tSchema: TSchema) {
    /**
     * Add our custom schema to provider
     */
    this.schema.register(kind, tSchema)
  }

  private schema = schemaProvider

  private schemaKindMap: Array<[TKind, TSchema]> = [
    [TAtLeastOne, AtLeastOneSchema],
    [Typebox.TRef, Typebox.Ref],
  ]

  private tSchema(kind: TKind): TSchema {
    const pair = this.schemaKindMap.find(([_kind]) => _kind === kind)

    if (!pair) {
      throw new Error('Not found')
    }

    return pair[1]
  }
}

export const Validator = new ValidationService()
