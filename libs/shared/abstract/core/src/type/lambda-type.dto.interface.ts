import { Typebox } from '@codelab/shared/abstract/typebox'
import { type Static, Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const ILambdaTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.LambdaType}`)),
])

export type ILambdaTypeDTO = Static<typeof ILambdaTypeDTO>

export const ILambdaType = ILambdaTypeDTO

export type ILambdaType = Static<typeof ILambdaType>
