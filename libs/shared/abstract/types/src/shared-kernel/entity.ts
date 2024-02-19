import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const IEntity = Type.Object({
  id: Type.String(),
})

export type IEntity = Static<typeof IEntity>
