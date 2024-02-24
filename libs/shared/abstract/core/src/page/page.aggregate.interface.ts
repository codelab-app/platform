import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IElement } from '../element'
import { IStoreAggregate } from '../store'
import { IPage } from './page.dto.interface'

export const IPageAggregate = Type.Object({
  elements: Type.Array(IElement),
  page: IPage,
  store: IStoreAggregate,
})

export type IPageAggregate = Static<typeof IPageAggregate>
