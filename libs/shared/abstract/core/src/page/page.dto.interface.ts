import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/ref.interface'
import { IPageKind } from './page-kind.enum'

export const PageDtoSchema = Type.Object({
  app: Typebox.Ref,
  id: Type.String(),
  kind: Type.Enum(IPageKind),
  name: Type.String(),
  // The container element of the page
  pageContentContainer: Typebox.Nullish(Typebox.Ref),
  redirect: Typebox.Nullish(Typebox.Ref),
  rootElement: Typebox.Ref,
  store: Typebox.Ref,
  urlPattern: Type.String(),
})

export type IPageDto = Static<typeof PageDtoSchema>

export const PageSchema = Type.Composite([
  PageDtoSchema,
  Type.Object({
    slug: Type.String(),
  }),
])

export type IPage = Static<typeof PageSchema>

// export type ICreatePageDto = Omit<IPageDto, 'rootElement' | 'store'>
