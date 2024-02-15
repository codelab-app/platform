import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IComponentAggregate } from '../component'
import { IPageAggregate } from '../page'
import { IApp } from './app.dto.interface'

export const IAppAggregate = Type.Object({
  app: IApp,
  components: Type.Array(IComponentAggregate),
  pages: Type.Array(IPageAggregate),
})

export type IAppAggregate = Static<typeof IAppAggregate>
