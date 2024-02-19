import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/node-type.interface'

export const ITagDto = Type.Object({
  children: Type.Optional(Type.Array(IRef)),
  // This is computed property
  descendants: Type.Optional(Type.Array(IRef)),
  id: Type.String(),
  isRoot: Typebox.Nullish(Type.Boolean()),
  name: Type.String(),
  parent: Typebox.Nullish(IRef),
})

export type ITagDto = Static<typeof ITagDto>

export const ITag = ITagDto

export type ITag = Static<typeof ITag>
