import type { Static, TKind, TSchema } from '@sinclair/typebox'
import type { ValidateFunction } from 'ajv'

/**
 * `parse` - validate and sanitize data
 * `assert` - validate data or throw
 * `validate` - validate data and return boolean
 */
export interface IValidationService {
  asserts<T extends TSchema>(
    kind: TKind,
    data: unknown,
    options?: { message: string },
  ): asserts data is Static<T>
  /**
   * Add commonly used methods as convenience
   */
  assertsDefined<T>(data: T, message?: string): asserts data is NonNullable<T>
  parse<T extends TSchema>(
    schema: T,
    data: unknown,
    options?: { message: string },
  ): Static<T>
  parseDefined<T>(data: T): NonNullable<T>
  validate(kind: TKind, data: unknown): boolean
  /**
   * @throws {Error} if validation fails
   */
  validateSchema<T extends TSchema>(schema: T, data: unknown): Static<T>
}
