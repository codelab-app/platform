import type { StaticDecode, TSchema } from '@sinclair/typebox'

export interface IValidationService<T extends TSchema> {
  asserts(value: unknown): asserts value is T
  decode(value: unknown): StaticDecode<T>
  validate(data: unknown): boolean
}
