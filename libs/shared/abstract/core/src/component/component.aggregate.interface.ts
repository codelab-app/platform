import type { Static } from '@sinclair/typebox'
import type { IElement } from '../element'
import { IStore } from '../store'
import { IApi } from '../type'
import { IComponent } from './component.dto.interface'

export const IComponentAggregate = Object({
  api: IApi,
  component: IComponent,
  elements: Array<IElement>,
  store: IStore,
})

export type IComponentAggregate = Static<typeof IComponentAggregate>
