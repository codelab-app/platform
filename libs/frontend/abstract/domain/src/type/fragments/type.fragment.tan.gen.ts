import * as Types from '@codelab/shared/abstract/codegen'

import { ActionTypeFragment } from './action-type.fragment.tan.gen'
import { AppTypeFragment } from './app-type.fragment.tan.gen'
import { ArrayTypeFragment } from './array-type.fragment.tan.gen'
import { CodeMirrorTypeFragment } from './code-mirror-type.fragment.tan.gen'
import { ElementTypeFragment } from './element-type.fragment.tan.gen'
import { EnumTypeFragment } from './enum-type.fragment.tan.gen'
import { InterfaceTypeFragment } from './interface.fragment.tan.gen'
import { LambdaTypeFragment } from './lambda-type.fragment.tan.gen'
import { PageTypeFragment } from './page-type.fragment.tan.gen'
import { PrimitiveTypeFragment } from './primitive-type.fragment.tan.gen'
import { ReactNodeTypeFragment } from './react-node-type.fragment.tan.gen'
import { RenderPropTypeFragment } from './render-prop.fragment.tan.gen'
import { RichTextTypeFragment } from './rich-text-type.fragment.tan.gen'
import { UnionTypeFragment } from './union-type.fragment.tan.gen'
import { ActionTypeFragmentDoc } from './action-type.fragment.tan.gen'
import { AppTypeFragmentDoc } from './app-type.fragment.tan.gen'
import { ArrayTypeFragmentDoc } from './array-type.fragment.tan.gen'
import { CodeMirrorTypeFragmentDoc } from './code-mirror-type.fragment.tan.gen'
import { ElementTypeFragmentDoc } from './element-type.fragment.tan.gen'
import { EnumTypeFragmentDoc } from './enum-type.fragment.tan.gen'
import { InterfaceTypeFragmentDoc } from './interface.fragment.tan.gen'
import { LambdaTypeFragmentDoc } from './lambda-type.fragment.tan.gen'
import { PageTypeFragmentDoc } from './page-type.fragment.tan.gen'
import { PrimitiveTypeFragmentDoc } from './primitive-type.fragment.tan.gen'
import { ReactNodeTypeFragmentDoc } from './react-node-type.fragment.tan.gen'
import { RenderPropTypeFragmentDoc } from './render-prop.fragment.tan.gen'
import { RichTextTypeFragmentDoc } from './rich-text-type.fragment.tan.gen'
import { UnionTypeFragmentDoc } from './union-type.fragment.tan.gen'
export type Type_ActionType_Fragment = ActionTypeFragment

export type Type_AppType_Fragment = AppTypeFragment

export type Type_ArrayType_Fragment = ArrayTypeFragment

export type Type_CodeMirrorType_Fragment = CodeMirrorTypeFragment

export type Type_ElementType_Fragment = ElementTypeFragment

export type Type_EnumType_Fragment = EnumTypeFragment

export type Type_InterfaceType_Fragment = InterfaceTypeFragment

export type Type_LambdaType_Fragment = LambdaTypeFragment

export type Type_PageType_Fragment = PageTypeFragment

export type Type_PrimitiveType_Fragment = PrimitiveTypeFragment

export type Type_ReactNodeType_Fragment = ReactNodeTypeFragment

export type Type_RenderPropType_Fragment = RenderPropTypeFragment

export type Type_RichTextType_Fragment = RichTextTypeFragment

export type Type_UnionType_Fragment = UnionTypeFragment

export type TypeFragment =
  | Type_ActionType_Fragment
  | Type_AppType_Fragment
  | Type_ArrayType_Fragment
  | Type_CodeMirrorType_Fragment
  | Type_ElementType_Fragment
  | Type_EnumType_Fragment
  | Type_InterfaceType_Fragment
  | Type_LambdaType_Fragment
  | Type_PageType_Fragment
  | Type_PrimitiveType_Fragment
  | Type_ReactNodeType_Fragment
  | Type_RenderPropType_Fragment
  | Type_RichTextType_Fragment
  | Type_UnionType_Fragment

export const TypeFragmentDoc = `
    fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
    ${ActionTypeFragmentDoc}
${AppTypeFragmentDoc}
${ArrayTypeFragmentDoc}
${CodeMirrorTypeFragmentDoc}
${ElementTypeFragmentDoc}
${EnumTypeFragmentDoc}
${InterfaceTypeFragmentDoc}
${LambdaTypeFragmentDoc}
${PageTypeFragmentDoc}
${PrimitiveTypeFragmentDoc}
${ReactNodeTypeFragmentDoc}
${RenderPropTypeFragmentDoc}
${RichTextTypeFragmentDoc}
${UnionTypeFragmentDoc}`
