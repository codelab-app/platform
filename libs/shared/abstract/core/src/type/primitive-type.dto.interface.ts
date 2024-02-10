import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDTO } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IPrimitiveTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.PrimitiveType}`)),
  Type.Object({
    primitiveKind: Type.Enum(PrimitiveTypeKind),
  }),
])

export type IPrimitiveTypeDTO = Static<typeof IPrimitiveTypeDTO>

export const IPrimitiveType = IPrimitiveTypeDTO

export type IPrimitiveType = Static<typeof IPrimitiveType>
