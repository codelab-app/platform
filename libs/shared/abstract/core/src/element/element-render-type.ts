import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

export enum IElementRenderTypeKind {
  Atom = 'Atom',
  Component = 'Component',
}

const AtomRenderTypeSchema = Typebox.DiscriminatedRef(
  IElementRenderTypeKind.Atom,
)

export type IAtomRenderType = Static<typeof AtomRenderTypeSchema>

export const ElementRenderTypeDtoSchema = Type.Union(
  [
    AtomRenderTypeSchema,
    Typebox.DiscriminatedRef(IElementRenderTypeKind.Component),
  ],
  { discriminantKey: '__typename' },
)

export type IElementRenderTypeDto = Static<typeof ElementRenderTypeDtoSchema>
