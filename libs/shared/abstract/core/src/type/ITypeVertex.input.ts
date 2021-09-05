import {
  IArrayTypeVertex,
  IBaseTypeVertex,
  IComponentTypeVertex,
  IElementTypeVertex,
  IEnumTypeValue,
  IInterfaceTypeVertex,
  ILambdaTypeVertex,
  IPrimitiveTypeVertex,
} from './ITypeVertex'

export type ITypeVertexInput =
  | IArrayTypeVertexInput
  | IComponentTypeVertexInput
  | IElementTypeVertexInput
  | IEnumTypeVertexInput
  | IInterfaceTypeVertexInput
  | ILambdaTypeVertexInput
  | IPrimitiveTypeVertexInput

export type IBaseTypeVertexInput = Omit<IBaseTypeVertex, 'id'>

export type ILambdaTypeVertexInput = Omit<ILambdaTypeVertex, 'id'>

export type IComponentTypeVertexInput = Omit<IComponentTypeVertex, 'id'>

export type IArrayTypeVertexInput = Omit<IArrayTypeVertex, 'id'>

export type IInterfaceTypeVertexInput = Omit<IInterfaceTypeVertex, 'id'>

export type IElementTypeVertexInput = Omit<IElementTypeVertex, 'id'>

export type IPrimitiveTypeVertexInput = Omit<IPrimitiveTypeVertex, 'id'>

export interface IEnumTypeVertexInput extends IBaseTypeVertexInput {
  allowedValues: Array<IEnumTypeValueInput>
}

export type IEnumTypeValueInput = Omit<IEnumTypeValue, 'id'>
