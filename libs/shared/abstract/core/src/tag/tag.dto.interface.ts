import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const TagDtoSchema = Type.Object({
  children: Type.Optional(Type.Array(Typebox.Ref)),
  // This is computed property
  descendants: Type.Optional(Type.Array(Typebox.Ref)),
  id: Type.String(),
  isRoot: Typebox.Nullish(Type.Boolean()),
  name: Type.String(),
  parent: Typebox.Nullish(Typebox.Ref),
})

export type ITagDto = Static<typeof TagDtoSchema>

export const TagSchema = TagDtoSchema

export type ITag = Static<typeof TagSchema>
