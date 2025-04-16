import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared-infra-typebox'
import { Type } from '@sinclair/typebox'

import { IPageKind } from './page-kind.enum'

export const PageDtoSchema = Type.Object({
  app: Typebox.RefSchema,
  /**
   * a pre-computed descendant elements ids
   */
  elements: Type.Optional(Type.Array(Typebox.RefSchema)),
  id: Type.String(),
  kind: Type.Enum(IPageKind),
  name: Type.String(),
  // The container element of the page
  pageContentContainer: Typebox.Nullish(Typebox.RefSchema),
  redirect: Typebox.Nullish(Typebox.RefSchema),
  rootElement: Typebox.RefSchema,
  store: Typebox.RefSchema,
  urlPattern: Type.String(),
})

export type IPageDto = Static<typeof PageDtoSchema>
