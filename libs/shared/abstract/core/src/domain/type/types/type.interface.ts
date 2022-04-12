import { IAppType } from './app-type/app-type.interface'
import { IArrayType } from './array-type/array-type.interface'
import { TypeKind } from './base-type/type-kind.enum'
import { IElementType } from './element-type/element-type.interface'
import { IEnumType } from './enum-type/enum-type.interface'
import { IInterfaceType } from './interface-type/interface-type.interface'
import { ILambdaType } from './lambda-type/lambda-type.interface'
import { IMonacoType } from './monaco-type/monaco-type.interface'
import { IPageType } from './page-type/page-type.interface'
import { IPrimitiveType } from './primitive-type/primitive-type.interface'
import { IReactNodeType } from './react-node-type/react-node-type.interface'
import { IRenderPropsType } from './render-props-type/render-props-type.enum'
import type { IUnionType } from './union-type/union-type.interface'

export type IAnyType =
  | IArrayType
  | IElementType
  | IEnumType
  | IInterfaceType
  | ILambdaType
  | IPageType
  | IAppType
  | IPrimitiveType
  | IRenderPropsType
  | IReactNodeType
  | IUnionType
  | IMonacoType

export type IType<TKind extends TypeKind> = IAnyType extends {
  typeKind: TKind
}
  ? IAnyType
  : never
