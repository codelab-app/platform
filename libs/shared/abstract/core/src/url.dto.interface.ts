import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const IUrlDTO = Type.Object({
  id: Type.String(),
  url: Type.String(),
})

export type IUrlDTO = Static<typeof IUrlDTO>
