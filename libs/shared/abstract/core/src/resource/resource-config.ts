import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

export const ResourceConfigDataSchema = Type.Object({
  headers: Type.Optional(Type.String()),
  url: Type.String(),
})

export type IResourceConfigData = Static<typeof ResourceConfigDataSchema>
