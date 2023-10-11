import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IComponentBoundedContext } from '../component'
import { IPageBoundedContext } from '../page'
import { IResource } from '../resource.dto.interface'
import { IApp } from './app.dto.interface'

export const IAppBoundedContext = Type.Object({
  app: IApp,
  components: Type.Array(IComponentBoundedContext),
  pages: Type.Array(IPageBoundedContext),
  resources: Type.Array(IResource),
})

export type IAppBoundedContext = Static<typeof IAppBoundedContext>
