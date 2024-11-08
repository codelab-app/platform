import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

export const PropDtoSchema = Type.Object({
  api: Typebox.Nullish(Typebox.Ref),
  data: Type.String(),
  id: Type.String(),
})

export type IPropDto = Static<typeof PropDtoSchema>

export type IPropData = ObjectLike
