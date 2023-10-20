import type { Static } from '@sinclair/typebox'
import { IComponent } from './component.dto.interface'
import type { IElement } from './element.dto.interface'
import { IStore } from './store.dto.interface'
import { IApi } from './type'

export const IComponentBoundedContext = Object({
  api: IApi,
  component: IComponent,
  elements: Array<IElement>,
  store: IStore,
})

export type IComponentBoundedContext = Static<typeof IComponentBoundedContext>
