import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IElementRenderTypeKind } from '../element'
import { IRef } from '../model/node-type.interface'
import { IAtomType } from './atom-type.enum'

export const IAtomDTO = Type.Object({
  __typename: Type.Literal(`${IElementRenderTypeKind.Atom}`),
  api: IRef,
  externalCssSource: Typebox.Nullish(Type.String()),
  externalJsSource: Typebox.Nullish(Type.String()),
  externalSourceType: Typebox.Nullish(Type.String()),
  icon: Typebox.Nullish(Type.String()),
  id: Type.String(),
  name: Type.String(),
  requiredParents: Type.Optional(Type.Array(IRef)),
  suggestedChildren: Type.Optional(Type.Array(IRef)),
  tags: Type.Optional(Type.Array(IRef)),
  type: Type.Enum(IAtomType),
})

export type IAtomDTO = Static<typeof IAtomDTO>

export const IAtom = Type.Composite([
  Type.Object({
    __typename: Type.Literal(`${IElementRenderTypeKind.Atom}`),
  }),
  IAtomDTO,
])

export type IAtom = Static<typeof IAtom>
