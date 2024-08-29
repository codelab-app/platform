import type { Static, StaticDecode, TKind, TSchema } from '@sinclair/typebox'

export interface IValidationService {
  asserts<T extends TSchema>(
    kind: TKind,
    value: unknown,
    { message }: { message: string },
  ): asserts value is Static<T>
  // decode<T extends TSchema>(value: unknown): StaticDecode<T>
  validate(kind: TKind, data: unknown): boolean
}
