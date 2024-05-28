import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IAction, IActionDto } from '../action'
import { IRef } from '../model/ref.interface'
import { IInterfaceTypeRef } from '../type'

export const IStoreDto = Type.Object({
  actions: Type.Optional(Type.Array(IActionDto)),
  api: IRef,
  component: Typebox.Nullish(IRef),
  id: Type.String(),
  name: Type.String(),
  page: Typebox.Nullish(IRef),
  source: Typebox.Nullish(IRef),
})

export type IStoreDto = Static<typeof IStoreDto>

export const IStore = Typebox.Overwrite(
  IStoreDto,
  Type.Object({
    actions: Type.Array(IAction),
    api: IInterfaceTypeRef,
  }),
)

export type IStore = Static<typeof IStore>
