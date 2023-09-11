import { IDiscriminatedEntity, IEntity } from '@codelab/shared/abstract/types'
import { Typebox } from '@codelab/shared/infra/validation'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IAtomType } from './atom-type.enum'
import { ITypeKind } from './type-kind.enum'

export const IAtomDTO = Type.Object({
  api: IDiscriminatedEntity(`${ITypeKind.InterfaceType}`),
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

export const IAtomProductionDto = Type.Composite([
  IAtomDTO,
  Type.Object({
    api: Type.Optional(IDiscriminatedEntity(`${ITypeKind.InterfaceType}`)),
  }),
])

export type IAtomProductionDto = Static<typeof IAtomProductionDto>
