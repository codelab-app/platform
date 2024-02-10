import { type Static, Type } from '@sinclair/typebox'
import { IBaseTypeDTO } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const ILambdaTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.LambdaType}`)),
])

export type ILambdaTypeDTO = Static<typeof ILambdaTypeDTO>

export const ILambdaType = ILambdaTypeDTO

export type ILambdaType = Static<typeof ILambdaType>
