import type { Static } from '@sinclair/typebox'
import type { IElement } from '../element'
import { IStoreAggregate } from '../store'
import { IApi } from '../type'
import { IComponent } from './component.dto.interface'

export const IComponentAggregate = Object({
  api: IApi,
  component: IComponent,
  elements: Array<IElement>,
  store: IStoreAggregate,
})

export type IComponentAggregate = Static<typeof IComponentAggregate>
