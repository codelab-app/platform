import { IAnyActionType } from './action-type'
import { IAppType } from './app-type'
import { IArrayType } from './array-type'
import { ITypeKind } from './base-type'
import { ICodeMirrorType } from './code-mirror-type'
import { IElementType } from './element-type'
import { IEnumType } from './enum-type'
import { IInterfaceType } from './interface-type'
import { ILambdaType } from './lambda-type'
import { IPageType } from './page-type'
import { IPrimitiveType } from './primitive-type'
import { IReactNodeType } from './react-node-type'
import { IRenderPropsType } from './render-props-type'
import type { IUnionType } from './union-type'

export type IAnyType =
  | IAppType
  | IAnyActionType
  | IArrayType
  | IElementType
  | IEnumType
  | IInterfaceType
  | ILambdaType
  | IPageType
  | IPrimitiveType
  | IReactNodeType
  | IRenderPropsType
  | IUnionType
  | ICodeMirrorType

export type ITypeRef = string

export type ITypeOf<TKind extends ITypeKind> = IAnyType extends {
  typeKind: TKind
}
  ? IAnyType
  : never
