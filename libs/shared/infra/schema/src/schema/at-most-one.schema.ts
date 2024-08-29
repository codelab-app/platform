import { Type } from '@sinclair/typebox'

export const AtMostOneSchema = Type.Array(Type.Any(), { maxItems: 1 })
