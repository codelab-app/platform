import { type TAnySchema, Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

export const values = <T extends TAnySchema>(schema: T) =>
  Value.Create(Type.Required(schema))
