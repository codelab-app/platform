import { IEntity, Nullable } from '@codelab/shared/abstract/types'
import { Typebox } from '@codelab/shared/infra/validation'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const IPropDTO = Type.Object({
  api: Typebox.Nullish(IEntity),
  data: Type.Optional(Type.String()),
  id: Type.String(),
})

export type IPropDTO = Static<typeof IPropDTO>
