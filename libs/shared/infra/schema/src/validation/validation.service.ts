import type { IValidationService } from '@codelab/shared/abstract/infra'
import type { Static, TKind, TSchema } from '@sinclair/typebox'

import { Value } from '@sinclair/typebox/value'
import { StandardValidator } from 'typebox-validators'

import { DefinedSchema, SchemaProvider, TDefined } from '../schema'

export class ValidationService implements IValidationService {
  static getInstance(schemaKindMap: Array<[TKind, TSchema]>) {
    if (!ValidationService.instance) {
      ValidationService.instance = new ValidationService(schemaKindMap)
    }

    return ValidationService.instance
  }

  private constructor(schemaKindMap: Array<[TKind, TSchema]>) {
    this.schema = SchemaProvider.getInstance(schemaKindMap)
  }

  asserts<T extends TSchema>(
    kind: TKind,
    data: unknown,
    options?: { message: string },
  ): asserts data is Static<T> {
    try {
      const validator = this.createValidator(kind)
      const schema = this.schema.tSchema(kind)
      const validate = schema['validate']

      if (validate && !validate(data)) {
        throw new Error(options?.message)
      }

      return validator.assert(data as Readonly<unknown>, options?.message)
    } catch (error: unknown) {
      console.error(kind, options?.message, data)
      throw new Error((error as Error).message)
    }
  }

  assertsDefined<T>(data: T): asserts data is NonNullable<T> {
    try {
      this.asserts(TDefined, data, { message: 'Data should be defined' })
    } catch (error: unknown) {
      console.error('Assertion error:', JSON.stringify(error))
      throw new Error((error as Error).message)
    }
  }

  /**
   * Parses a value or throws an `AssertError` if invalid
   *
   * Using `Value.Parse` caused circular dep issue inside `@computed`
   *
   * https://github.com/sinclairzx81/typebox?tab=readme-ov-file#parse
   */
  parseDefined<T>(data: T) {
    const validated = Value.Check(DefinedSchema, data)

    if (!validated) {
      throw new Error('Data should be defined')
    }

    return data as NonNullable<T>
  }

  /**
   * Extends typebox `SchemaOptions` with custom `validate` key
   */
  validate(kind: TKind, data: Readonly<unknown>) {
    try {
      const validator = this.createValidator(kind)
      const truthy = validator.test(data)
      const schema = this.schema.tSchema(kind)
      const validate = schema['validate']

      if (validate) {
        return truthy && schema['validate'](data)
      }

      return truthy
    } catch (error: unknown) {
      console.error('Validation error:', JSON.stringify(error))
      throw new Error((error as Error).message)
    }
  }

  validateAndClean<T extends TSchema>(schema: T, data: unknown): Static<T> {
    try {
      const validator = new StandardValidator(schema)

      return validator.validateAndCleanCopy(data as Readonly<unknown>)
    } catch (error: unknown) {
      console.error('Validation error:', JSON.stringify(error))
      throw new Error((error as Error).message)
    }
  }

  private static instance?: ValidationService

  private createValidator(kind: TKind) {
    try {
      this.schema.assertHasRegistry(kind)

      return new StandardValidator(this.schema.tSchema(kind))
    } catch (error: unknown) {
      console.error('Validator creation error:', JSON.stringify(error))
      throw new Error((error as Error).message)
    }
  }

  private schema
}
