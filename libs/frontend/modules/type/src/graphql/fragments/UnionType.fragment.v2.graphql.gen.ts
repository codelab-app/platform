import * as Types from '@codelab/shared/abstract/codegen-v2';

import { TypeBase_AppType_Fragment, TypeBase_ArrayType_Fragment, TypeBase_ElementType_Fragment, TypeBase_EnumType_Fragment, TypeBase_InterfaceType_Fragment, TypeBase_LambdaType_Fragment, TypeBase_MonacoType_Fragment, TypeBase_PageType_Fragment, TypeBase_PrimitiveType_Fragment, TypeBase_ReactNodeType_Fragment, TypeBase_RenderPropsType_Fragment, TypeBase_UnionType_Fragment } from './TypeBase.fragment.v2.graphql.gen';
import { gql } from 'graphql-request';
import { TypeBaseFragmentDoc } from './TypeBase.fragment.v2.graphql.gen';
export type UnionTypeWithInnerTypesFragment = (
  { typesOfUnionType?: Array<TypeBase_AppType_Fragment | TypeBase_ArrayType_Fragment | TypeBase_ElementType_Fragment | TypeBase_EnumType_Fragment | TypeBase_InterfaceType_Fragment | TypeBase_LambdaType_Fragment | TypeBase_MonacoType_Fragment | TypeBase_PageType_Fragment | TypeBase_PrimitiveType_Fragment | TypeBase_ReactNodeType_Fragment | TypeBase_RenderPropsType_Fragment | TypeBase_UnionType_Fragment> | null | undefined }
  & UnionTypeFragment
);

export type UnionTypeFragment = TypeBase_UnionType_Fragment;

export const UnionTypeFragmentDoc = gql`
    fragment UnionType on UnionType {
  ...TypeBase
}
    ${TypeBaseFragmentDoc}`;
export const UnionTypeWithInnerTypesFragmentDoc = gql`
    fragment UnionTypeWithInnerTypes on UnionType {
  ...UnionType
  typesOfUnionType {
    ... on TypeBase {
      ...TypeBase
    }
  }
}
    ${UnionTypeFragmentDoc}
${TypeBaseFragmentDoc}`;