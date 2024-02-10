import { type Static, Type } from '@sinclair/typebox'
import { IComponent } from './component.dto.interface'
import { IElement } from './element.dto.interface'
import { IStoreBoundedContext } from './store.bounded-context.interface'
import { IApi } from './type'

export const IComponentBoundedContext = Type.Object({
  api: IApi,
  component: IComponent,
  elements: Type.Array(IElement),
  store: IStoreBoundedContext,
})

export type IComponentBoundedContext = Static<typeof IComponentBoundedContext>
