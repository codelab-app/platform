import type { TAnySchema } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const OmitOwner = <T extends TAnySchema>(schema: T) =>
  Type.Omit(schema, ['owner'])
