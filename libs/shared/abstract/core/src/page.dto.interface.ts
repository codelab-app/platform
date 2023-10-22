import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from './model/node-type.interface'
import { IPageKind } from './page-kind.enum'

export const IPageDTO = Type.Object({
  app: IRef,
  id: Type.String(),
  kind: Type.Enum(IPageKind),
  name: Type.String(),
  // The container element of the page
  pageContentContainer: Typebox.Nullish(IRef),
  rootElement: IRef,
  store: IRef,
  url: Type.String(),
})

export type IPageDTO = Static<typeof IPageDTO>

export const IPage = Typebox.Overwrite(
  IPageDTO,
  Type.Object({
    slug: Type.String(),
  }),
)

export type IPage = Static<typeof IPage>
