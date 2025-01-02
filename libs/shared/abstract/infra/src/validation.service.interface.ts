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
    value: unknown,
    options?: { message: string },
  ): asserts value is Static<T>
  /**
   * Add commonly used methods as convenience
   */
  assertsDefined<T>(data: T): asserts data is NonNullable<T>
  // parse<T extends TSchema>(schema: T, data: unknown): Static<T>
  parseDefined<T>(data: T): NonNullable<T>
  validate(kind: TKind, data: unknown): boolean
}
