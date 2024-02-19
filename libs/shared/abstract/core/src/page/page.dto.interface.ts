import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/node-type.interface'
import { IPageKind } from './page-kind.enum'

export const IPageDto = Type.Object({
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

export type IPageDto = Static<typeof IPageDto>

export const IPage = Typebox.Overwrite(
  IPageDto,
  Type.Object({
    slug: Type.String(),
  }),
)

export type IPage = Static<typeof IPage>

export type ICreatePageDto = Omit<IPageDto, 'rootElement' | 'store'>
