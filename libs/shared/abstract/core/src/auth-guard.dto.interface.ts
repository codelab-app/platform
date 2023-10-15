import { Typebox } from '@codelab/shared/abstract/typebox'
import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const IAuthGuardDTO = Type.Object({
  id: Type.String(),
  name: Type.String(),
  resource: Typebox.Nullish(IEntity),
})

export type IAuthGuardDTO = Static<typeof IAuthGuardDTO>
