import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { ActionDtoSchema, ActionSchema } from '../action'
import { InterfaceTypeCreateDtoSchema } from '../type'

export const StoreDtoSchema = Type.Object({
  actions: Type.Optional(Type.Array(Typebox.Ref)),
  api: Typebox.Ref,
  component: Typebox.Nullish(Typebox.Ref),
  id: Type.String(),
  name: Type.String(),
  page: Typebox.Nullish(Typebox.Ref),
  source: Typebox.Nullish(Typebox.Ref),
})

export type IStoreDto = Static<typeof StoreDtoSchema>

export const StoreCreateDtoSchema = Type.Object({
  ...StoreDtoSchema.properties,
  api: InterfaceTypeCreateDtoSchema,
})

export type IStoreCreateDto = Static<typeof StoreCreateDtoSchema>
