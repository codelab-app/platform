import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IActionType } from './action-type'
import type { IAppType } from './app-type'
import type { IArrayType } from './array-type'
import type { ICodeMirrorType } from './code-mirror-type'
import type { IElementType } from './element-type'
import type { IEnumType } from './enum-type'
import type { IInterfaceType } from './interface-type'
import type { ILambdaType } from './lambda-type'
import type { IPageType } from './page-type'
import type { IPrimitiveType } from './primitive-type'
import type { IReactNodeType } from './react-node-type'
import type { IRenderPropType } from './render-prop-type'
import type { IUnionType } from './union-type'

export type IType =
  | IActionType
  | IAppType
  | IArrayType
  | ICodeMirrorType
  | IElementType
  | IEnumType
  | IInterfaceType
  | ILambdaType
  | IPageType
  | IPrimitiveType
  | IReactNodeType
  | IRenderPropType
  | IUnionType

export type ITypeRef = string

export type ITypeOf<TKind extends ITypeKind> = IType extends {
  typeKind: TKind
}
  ? IType
  : never
