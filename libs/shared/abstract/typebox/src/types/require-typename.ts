import type { TObject } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const RequireTypename = <T extends TObject>(schema: T) =>
  Type.Composite([
    Type.Omit(schema, ['__typename']),
    Type.Required(Type.Pick(schema, ['__typename'])),
  ])
