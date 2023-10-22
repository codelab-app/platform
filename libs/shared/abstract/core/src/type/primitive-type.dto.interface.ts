import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const IPrimitiveTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.PrimitiveType}`)),
  Type.Object({
    primitiveKind: Type.Enum(PrimitiveTypeKind),
  }),
])

export type IPrimitiveTypeDTO = Static<typeof IPrimitiveTypeDTO>

export const IPrimitiveType = IPrimitiveTypeDTO

export type IPrimitiveType = Static<typeof IPrimitiveType>
