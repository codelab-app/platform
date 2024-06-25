import type { Static, TSchema } from '@sinclair/typebox'

export type AssertIsSchema<T extends Static<TSchema>> = (
  value: unknown,
) => asserts value is T
