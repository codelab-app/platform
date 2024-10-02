import type { TObject } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

export const OmitOwner = <T extends TObject>(schema: T) =>
  Type.Omit(schema, ['owner'])
