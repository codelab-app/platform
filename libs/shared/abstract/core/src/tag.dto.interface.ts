import { IEntity, Typebox } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IAuth0Owner } from './user.interface'

export const ITagDTO = Type.Composite([
  IAuth0Owner,
  Type.Object({
    children: Type.Optional(Type.Array(IEntity)),
    // This is computed property
    descendants: Type.Optional(Type.Array(IEntity)),
    id: Type.String(),
    isRoot: Typebox.Nullish(Type.Boolean()),
    name: Type.String(),
    parent: Typebox.Nullish(IEntity),
  }),
])

export type ITagDTO = Static<typeof ITagDTO>
