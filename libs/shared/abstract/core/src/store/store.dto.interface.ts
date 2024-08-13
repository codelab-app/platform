import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ActionDtoSchema, ActionSchema } from '../action'

export const StoreDtoSchema = Type.Object({
  actions: Type.Optional(Type.Array(ActionDtoSchema)),
  api: Typebox.Ref,
  component: Typebox.Nullish(Typebox.Ref),
  id: Type.String(),
  name: Type.String(),
  page: Typebox.Nullish(Typebox.Ref),
  source: Typebox.Nullish(Typebox.Ref),
})

export type IStoreDto = Static<typeof StoreDtoSchema>

export const StoreSchema = Typebox.Overwrite(
  StoreDtoSchema,
  Type.Object({
    actions: Type.Array(ActionSchema),
    api: Typebox.Ref,
  }),
)

export type IStore = Static<typeof StoreSchema>
