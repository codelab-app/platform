import { Typebox } from '@codelab/shared/abstract/typebox'
import {
  IEntity,
  IMaybeDiscriminatedEntity,
} from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IElementRenderTypeKind } from '../element'
import { ITypeKind } from '../type-kind.enum'
import { IAtomType } from './atom-type.enum'

export const IAtomDTO = Type.Object({
  api: IMaybeDiscriminatedEntity(`${ITypeKind.InterfaceType}`),
  externalCssSource: Typebox.Nullish(Type.String()),
  externalJsSource: Typebox.Nullish(Type.String()),
  externalSourceType: Typebox.Nullish(Type.String()),
  icon: Typebox.Nullish(Type.String()),
  id: Type.String(),
  name: Type.String(),
  requiredParents: Type.Optional(Type.Array(IEntity)),
  suggestedChildren: Type.Optional(Type.Array(IEntity)),
  tags: Type.Optional(Type.Array(IEntity)),
  type: Type.Enum(IAtomType),
})

export type IAtomDTO = Static<typeof IAtomDTO>

export const IAtomSerialized = Type.Composite([
  Type.Object({
    __typename: Type.Literal(`${IElementRenderTypeKind.Atom}`),
  }),
  IAtomDTO,
])

export type IAtomSerialized = Static<typeof IAtomSerialized>