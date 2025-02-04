import type { IValidationService } from '@codelab/shared/abstract/infra'
import type { SchemaOptions, Static, TKind, TSchema } from '@sinclair/typebox'

import { Value } from '@sinclair/typebox/value'

import type { TypeBoxProvider } from '../provider/typebox.provider'

import { DefinedSchema, TDefined } from '../schema'
import { NestedValidator } from '../validator/nested-validator'

/**
 * Create a facade around `NestedValidator`
 */
export class ValidationService implements IValidationService {
  static getInstance(typeBox: TypeBoxProvider) {
    if (!ValidationService.instance) {
      ValidationService.instance = new ValidationService(typeBox)
    }

    return ValidationService.instance
  }

  private constructor(private typeBox: TypeBoxProvider) {}

  /**
   * Asserts that data matches the schema for the given kind.
   *
   * Supports custom validation through schema['validate'] function:
   *
   * ```typescript
   * const EmailSchema = Type.String({
   *   format: 'email',
   *   validate: (value: string) => {
   *     return value.includes('@company.com')
   *   }
   * })
   * ```
   *
   * Custom validation runs before standard TypeBox validation.
   * If custom validation fails, throws error with provided message.
   *
   * @throws {Error} When validation fails
   */
  asserts<T extends TSchema>(
    kind: TKind,
    data: unknown,
    options?: { message: string },
  ): asserts data is Static<T> {
    try {
      const schema = this.typeBox.tSchema(kind)
      const validator = this.createValidator(schema)

      this.runCustomValidation(schema, data, options?.message)

      return validator.assert(data as Readonly<unknown>, options?.message)
    } catch (error) {
      console.log('Validation error:', { data, kind }, error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }

  /**
   * Create facade for commonly used methods
   */
  assertsDefined<T>(data: T, message?: string): asserts data is NonNullable<T> {
    return this.asserts(TDefined, data, {
      message: message ?? 'Data should be defined',
    })
  }

  /**
   * Validates and cleans data according to the schema for the given kind.
   * Removes any properties not defined in the schema.
   *
   * @throws {Error} When validation fails
   */
  parse<T extends TSchema>(
    schema: T,
    data: unknown,
    options?: { message: string },
  ): Static<T> {
    const validator = this.createValidator(schema)

    this.runCustomValidation(schema, data, options?.message)

    return validator.validateAndCleanCopy(data as Readonly<unknown>)
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
    const schema = this.typeBox.tSchema(kind)
    const validator = this.createValidator(schema)
    const truthy = validator.test(data)
    const validate = schema['validate']

    if (validate) {
      return truthy && schema['validate'](data)
    }

    return truthy
  }

  /**
   * Validates data against a provided schema
   */
  validateSchema<T extends TSchema>(
    schema: T,
    data: Readonly<unknown>,
  ): Static<T> {
    const validator = this.createValidator(schema)

    this.runCustomValidation(schema, data)

    validator.validate(data)

    return data
  }

  private static instance?: ValidationService

  private createValidator<T extends TSchema>(schema: T) {
    return new NestedValidator<T>(schema)
  }

  /**
   * Run custom validation on Typebox schema
   *
   * Type.Object({}, { validate: (data: unknown) => { return true } })
   */
  private runCustomValidation(
    schema: TSchema & SchemaOptions,
    data: unknown,
    message?: string,
  ) {
    const validate: SchemaOptions['validate'] = schema['validate']

    if (validate && !validate(data)) {
      throw new Error(message)
    }
  }
}
