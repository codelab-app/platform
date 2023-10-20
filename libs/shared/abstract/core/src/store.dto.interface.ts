import { Typebox } from '@codelab/shared/abstract/typebox'
import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IAction, IActionDTO } from './action'
import { IInterfaceTypeRef } from './type'

export const IStoreDTO = Type.Object({
  actions: Type.Optional(Type.Array(IActionDTO)),
  api: IEntity,
  component: Typebox.Nullish(IEntity),
  id: Type.String(),
  name: Type.String(),
  page: Typebox.Nullish(IEntity),
  source: Typebox.Nullish(IEntity),
})

export type IStoreDTO = Static<typeof IStoreDTO>

export const IStore = Typebox.Overwrite(
  IStoreDTO,
  Type.Object({
    actions: Type.Array(IAction),
    api: IInterfaceTypeRef,
  }),
)

export type IStore = Static<typeof IStore>
