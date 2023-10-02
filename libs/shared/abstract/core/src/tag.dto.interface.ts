import { Typebox } from '@codelab/shared/abstract/typebox'
import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const ITagDTO = Type.Object({
  children: Type.Optional(Type.Array(IEntity)),
  // This is computed property
  descendants: Type.Optional(Type.Array(IEntity)),
  id: Type.String(),
  isRoot: Typebox.Nullish(Type.Boolean()),
  name: Type.String(),
  parent: Typebox.Nullish(IEntity),
})

export type ITagDTO = Static<typeof ITagDTO>
