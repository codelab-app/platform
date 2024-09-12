import type { Static, TKind, TSchema } from '@sinclair/typebox'

export interface IValidationService {
  asserts<T extends TSchema>(
    kind: TKind,
    value: unknown,
    { message }?: { message?: string },
  ): asserts value is Static<T>
  /**
   * Add commonly used methods as convenience
   */
  assertsDefined<T>(data: T): asserts data is NonNullable<T>
  parseDefined<T>(data: T): NonNullable<T>
  validate(kind: TKind, data: unknown): boolean
  validateAndClean<T extends TSchema>(schema: T, data: unknown): Static<T>
}
