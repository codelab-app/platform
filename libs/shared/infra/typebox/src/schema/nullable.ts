import { type TSchema, Type } from '@sinclair/typebox'

export const Nullish = <T extends TSchema>(schema: T) =>
  Type.Optional(Type.Union([schema, Type.Null()]))
