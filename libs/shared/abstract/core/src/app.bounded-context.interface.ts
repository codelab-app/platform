import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IApp } from './app.dto.interface'
import { IComponentBoundedContext } from './component.bounded-context.interface'
import { IPageBoundedContext } from './page.bounded-context.interface'

export const IAppBoundedContext = Type.Object({
  app: IApp,
  components: Type.Array(IComponentBoundedContext),
  pages: Type.Array(IPageBoundedContext),
})

export type IAppBoundedContext = Static<typeof IAppBoundedContext>
