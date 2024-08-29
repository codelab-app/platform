import { Type } from '@sinclair/typebox'

export const NoneSchema = Type.Array(Type.Any(), { maxItems: 0 })
