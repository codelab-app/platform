import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IPrimitiveTypeDto = Type.Composite([
  IBaseTypeDto(Type.Literal(`${ITypeKind.PrimitiveType}`)),
  Type.Object({
    primitiveKind: Type.Enum(PrimitiveTypeKind),
  }),
])

export type IPrimitiveTypeDto = Static<typeof IPrimitiveTypeDto>

export const IPrimitiveType = IPrimitiveTypeDto

export type IPrimitiveType = Static<typeof IPrimitiveType>
