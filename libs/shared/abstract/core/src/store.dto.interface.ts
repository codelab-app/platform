import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IAction, IActionDTO } from './action'
import { IRef } from './model/node-type.interface'
import { IInterfaceTypeRef } from './type'

export const IStoreDTO = Type.Object({
  actions: Type.Optional(Type.Array(IActionDTO)),
  api: IRef,
  component: Typebox.Nullish(IRef),
  id: Type.String(),
  name: Type.String(),
  page: Typebox.Nullish(IRef),
  source: Typebox.Nullish(IRef),
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
