import { type Static, Type } from '@sinclair/typebox'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const ILambdaTypeDto = Type.Composite([
  IBaseTypeDto(Type.Literal(`${ITypeKind.LambdaType}`)),
])

export type ILambdaTypeDto = Static<typeof ILambdaTypeDto>

export const ILambdaType = ILambdaTypeDto

export type ILambdaType = Static<typeof ILambdaType>
