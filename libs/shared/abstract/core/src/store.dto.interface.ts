import { IEntity, Typebox } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IActionEntity } from './action'

export const IStoreDTO = Type.Object({
  actions: Type.Optional(Type.Array(IActionEntity)),
  api: Typebox.Nullish(IEntity),
  component: Typebox.Nullish(IEntity),
  id: Type.String(),
  name: Type.String(),
  page: Typebox.Nullish(IEntity),
  source: Typebox.Nullish(IEntity),
})

export type IStoreDTO = Static<typeof IStoreDTO>
