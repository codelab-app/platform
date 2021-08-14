import { IVertex } from '../../IVertex'
import { ElementTypeKind, PrimitiveKind, TypeKind } from '../enums'

export type ITypeVertex =
  | IArrayTypeVertex
  | IComponentTypeVertex
  | IElementTypeVertex
  | IEnumTypeVertex
  | IInterfaceTypeVertex
  | ILambdaTypeVertex
  | IPrimitiveTypeVertex

export interface IBaseTypeVertex<TTypeKind extends TypeKind> extends IVertex {
  name: string
  typeKind: TTypeKind
}

export type ILambdaTypeVertex = IBaseTypeVertex<TypeKind.LambdaType>

export type IComponentTypeVertex = IBaseTypeVertex<TypeKind.ComponentType>

export type IArrayTypeVertex = IBaseTypeVertex<TypeKind.ArrayType>

export type IInterfaceTypeVertex = IBaseTypeVertex<TypeKind.InterfaceType>

export interface IElementTypeVertex
  extends IBaseTypeVertex<TypeKind.ElementType> {
  kind: ElementTypeKind
}

export interface IPrimitiveTypeVertex
  extends IBaseTypeVertex<TypeKind.PrimitiveType> {
  primitiveKind: PrimitiveKind
}

export interface IEnumTypeVertex extends IBaseTypeVertex<TypeKind.EnumType> {
  allowedValues: Array<IEnumTypeValue>
}

export interface IEnumTypeValue {
  id: string
  name?: string | null
  value: string
}
