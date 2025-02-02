import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { IElementRenderTypeKind } from '../element'
import { OwnerSchema } from '../user'
import { IAtomType } from './atom-type.enum'

export const AtomDtoSchema = Type.Composite([
  OwnerSchema,
  Type.Object({
    __typename: Type.Literal(`${IElementRenderTypeKind.Atom}`),
    api: Typebox.RefSchema,
    externalCssSource: Typebox.Nullish(Type.String()),
    externalJsSource: Typebox.Nullish(Type.String()),
    externalSourceType: Typebox.Nullish(Type.String()),
    icon: Typebox.Nullish(Type.String()),
    id: Type.String(),
    name: Type.String(),
    requiredParents: Type.Optional(Type.Array(Typebox.RefSchema)),
    suggestedChildren: Type.Optional(Type.Array(Typebox.RefSchema)),
    tags: Type.Optional(Type.Array(Typebox.RefSchema)),
    type: Type.Enum(IAtomType),
  }),
])

export type IAtomDto = Static<typeof AtomDtoSchema>
