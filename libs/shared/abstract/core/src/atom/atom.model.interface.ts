import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { IElementRenderTypeKind } from '../element'
import { AtomDtoSchema } from './atom.dto.interface'

export const AtomSchema = Type.Composite([
  Type.Object({
    __typename: Type.Literal(`${IElementRenderTypeKind.Atom}`),
  }),
  AtomDtoSchema,
])

export type IAtom = Static<typeof AtomSchema>
