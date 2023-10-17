import { Typebox } from '@codelab/shared/abstract/typebox'
import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IPageKind } from './page-kind.enum'

export const IPageDTO = Type.Object({
  app: IEntity,
  authGuard: Typebox.Nullish(IEntity),
  id: Type.String(),
  kind: Type.Enum(IPageKind),
  name: Type.String(),
  // The container element of the page
  pageContentContainer: Typebox.Nullish(IEntity),
  rootElement: IEntity,
  store: IEntity,
  url: Type.String(),
})

export type IPageDTO = Static<typeof IPageDTO>

export const IPage = Type.Composite([
  IPageDTO,
  Type.Object({
    slug: Type.String(),
  }),
])

export type IPage = Static<typeof IPage>
