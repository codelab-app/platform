import { Typebox } from '@codelab/shared/abstract/typebox'
import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const IArrayTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ArrayType}`)),
  Type.Object({
    itemType: Type.Optional(IEntity),
  }),
])

export type IArrayTypeDTO = Static<typeof IArrayTypeDTO>

export const IArrayType = Typebox.RequireTypename(IArrayTypeDTO)

export type IArrayType = Static<typeof IArrayType>
