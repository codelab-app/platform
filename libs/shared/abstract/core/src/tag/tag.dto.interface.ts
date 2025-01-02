import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

export const TagDtoSchema = Type.Object({
  children: Type.Optional(Type.Array(Typebox.RefSchema)),
  // This is computed property
  descendants: Type.Optional(Type.Array(Typebox.RefSchema)),
  id: Type.String(),
  name: Type.String(),
  owner: Typebox.RefSchema,
  parent: Typebox.Nullish(Typebox.RefSchema),
})

export type ITagDto = Static<typeof TagDtoSchema>

export const TagSchema = TagDtoSchema

export type ITag = Static<typeof TagSchema>
