import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ICreateElementDto } from '../element/element.dto.interface'
import { IStoreAggregate } from '../store'
import { IApi } from '../type'
import { IComponent } from './component.dto.interface'

export const IComponentAggregate = Type.Object({
  api: IApi,
  component: IComponent,
  elements: Type.Array(ICreateElementDto),
  store: IStoreAggregate,
})

export type IComponentAggregate = Static<typeof IComponentAggregate>
