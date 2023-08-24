import { type Static, Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const ILambdaTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.LambdaType}`)),
])

export type ILambdaTypeDTO = Static<typeof ILambdaTypeDTO>
