import * as Types from '@codelab/shared/abstract/codegen';

import { ActionTypeFragment } from './action-type.fragment.graphql.gen';
import { AppTypeFragment } from './app-type.fragment.graphql.gen';
import { ArrayTypeFragment } from './array-type.fragment.graphql.gen';
import { CodeMirrorTypeFragment } from './code-mirror-type.fragment.graphql.gen';
import { ElementTypeFragment } from './element-type.fragment.graphql.gen';
import { EnumTypeFragment } from './enum-type.fragment.graphql.gen';
import { InterfaceTypeFragment } from './interface.fragment.graphql.gen';
import { LambdaTypeFragment } from './lambda-type.fragment.graphql.gen';
import { PageTypeFragment } from './page-type.fragment.graphql.gen';
import { PrimitiveTypeFragment } from './primitive-type.fragment.graphql.gen';
import { ReactNodeTypeFragment } from './react-node-type.fragment.graphql.gen';
import { RenderPropTypeFragment } from './render-prop.fragment.graphql.gen';
import { RichTextTypeFragment } from './rich-text-type.fragment.graphql.gen';
import { UnionTypeFragment } from './union-type.fragment.graphql.gen';
import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
import { ActionTypeFragmentDoc } from './action-type.fragment.graphql.gen';
import { AppTypeFragmentDoc } from './app-type.fragment.graphql.gen';
import { ArrayTypeFragmentDoc } from './array-type.fragment.graphql.gen';
import { CodeMirrorTypeFragmentDoc } from './code-mirror-type.fragment.graphql.gen';
import { ElementTypeFragmentDoc } from './element-type.fragment.graphql.gen';
import { EnumTypeFragmentDoc } from './enum-type.fragment.graphql.gen';
import { InterfaceTypeFragmentDoc } from './interface.fragment.graphql.gen';
import { LambdaTypeFragmentDoc } from './lambda-type.fragment.graphql.gen';
import { PageTypeFragmentDoc } from './page-type.fragment.graphql.gen';
import { PrimitiveTypeFragmentDoc } from './primitive-type.fragment.graphql.gen';
import { ReactNodeTypeFragmentDoc } from './react-node-type.fragment.graphql.gen';
import { RenderPropTypeFragmentDoc } from './render-prop.fragment.graphql.gen';
import { RichTextTypeFragmentDoc } from './rich-text-type.fragment.graphql.gen';
import { UnionTypeFragmentDoc } from './union-type.fragment.graphql.gen';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type Type_ActionType_Fragment = ActionTypeFragment;

export type Type_AppType_Fragment = AppTypeFragment;

export type Type_ArrayType_Fragment = ArrayTypeFragment;

export type Type_CodeMirrorType_Fragment = CodeMirrorTypeFragment;

export type Type_ElementType_Fragment = ElementTypeFragment;

export type Type_EnumType_Fragment = EnumTypeFragment;

export type Type_InterfaceType_Fragment = InterfaceTypeFragment;

export type Type_LambdaType_Fragment = LambdaTypeFragment;

export type Type_PageType_Fragment = PageTypeFragment;

export type Type_PrimitiveType_Fragment = PrimitiveTypeFragment;

export type Type_ReactNodeType_Fragment = ReactNodeTypeFragment;

export type Type_RenderPropType_Fragment = RenderPropTypeFragment;

export type Type_RichTextType_Fragment = RichTextTypeFragment;

export type Type_UnionType_Fragment = UnionTypeFragment;

export type TypeFragment = Type_ActionType_Fragment | Type_AppType_Fragment | Type_ArrayType_Fragment | Type_CodeMirrorType_Fragment | Type_ElementType_Fragment | Type_EnumType_Fragment | Type_InterfaceType_Fragment | Type_LambdaType_Fragment | Type_PageType_Fragment | Type_PrimitiveType_Fragment | Type_ReactNodeType_Fragment | Type_RenderPropType_Fragment | Type_RichTextType_Fragment | Type_UnionType_Fragment;

export const TypeFragmentDoc = gql`
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
${UnionTypeFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;