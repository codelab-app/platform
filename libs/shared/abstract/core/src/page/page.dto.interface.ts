import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { IPageKind } from './page-kind.enum'

export const PageDtoSchema = Type.Object({
  app: Typebox.Ref,
  /**
   * a pre-computed descendant elements ids
   */
  elements: Type.Optional(Type.Array(Typebox.Ref)),
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
