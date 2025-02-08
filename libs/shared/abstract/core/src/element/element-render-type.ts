import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

export enum IElementRenderTypeKind {
  Atom = 'Atom',
  Component = 'Component',
}

export const ElementRenderTypeDtoSchema = Type.Union(
  [
    Typebox.DiscriminatedRef(IElementRenderTypeKind.Atom),
    Typebox.DiscriminatedRef(IElementRenderTypeKind.Component),
  ],
  { discriminantKey: '__typename' },
)

export type IElementRenderTypeDto = Static<typeof ElementRenderTypeDtoSchema>
