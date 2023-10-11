import { type Static, Type } from '@sinclair/typebox'
import { IElement } from '../element'
import { IStoreBoundedContext } from '../store'
import { IApi } from '../type'
import { IComponent } from './component.dto.interface'

export const IComponentBoundedContext = Type.Object({
  api: IApi,
  component: IComponent,
  elements: Type.Array(IElement),
  store: IStoreBoundedContext,
})

export type IComponentBoundedContext = Static<typeof IComponentBoundedContext>
