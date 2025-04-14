import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

export const PropDtoSchema = Type.Object({
  data: Type.String(),
  id: Type.String(),
})

export type IPropDto = Static<typeof PropDtoSchema>

export type IPropData = ObjectLike
