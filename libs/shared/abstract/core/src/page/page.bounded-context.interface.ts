import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IElement } from '../element'
import { IPage } from './page.dto.interface'
import { IStoreBoundedContext } from '../store'

export const IPageBoundedContext = Type.Object({
  elements: Type.Array(IElement),
  page: IPage,
  store: IStoreBoundedContext,
})

export type IPageBoundedContext = Static<typeof IPageBoundedContext>