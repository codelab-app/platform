import * as Types from '@codelab/shared/codegen/graphql';

import { ArrayTypeFragment } from './ArrayType.fragment.web.graphql.gen';
import { EnumTypeFragment } from './EnumType.fragment.web.graphql.gen';
import { InterfaceFragment } from './Interface.fragment.web.graphql.gen';
import { PrimitiveTypeFragment } from './PrimitiveType.fragment.web.graphql.gen';
import { ElementTypeFragment } from './ElementType.fragment.web.graphql.gen';
import { LambdaTypeFragment } from './LambdaType.fragment.web.graphql.gen';
import { ComponentTypeFragment } from './ComponentType.fragment.web.graphql.gen';
import { gql } from '@apollo/client';
import { ArrayTypeFragmentDoc } from './ArrayType.fragment.web.graphql.gen';
import { EnumTypeFragmentDoc } from './EnumType.fragment.web.graphql.gen';
import { InterfaceFragmentDoc } from './Interface.fragment.web.graphql.gen';
import { PrimitiveTypeFragmentDoc } from './PrimitiveType.fragment.web.graphql.gen';
import { ElementTypeFragmentDoc } from './ElementType.fragment.web.graphql.gen';
import { LambdaTypeFragmentDoc } from './LambdaType.fragment.web.graphql.gen';
import { ComponentTypeFragmentDoc } from './ComponentType.fragment.web.graphql.gen';
export type Type_ArrayType_Fragment = (
  { __typename: 'ArrayType', id: string, name: string, typeKind: Types.TypeKind }
  & ArrayTypeFragment
);

export type Type_ComponentType_Fragment = (
  { __typename: 'ComponentType', id: string, name: string, typeKind: Types.TypeKind }
  & ComponentTypeFragment
);

export type Type_ElementType_Fragment = (
  { __typename: 'ElementType', id: string, name: string, typeKind: Types.TypeKind }
  & ElementTypeFragment
);

export type Type_EnumType_Fragment = (
  { __typename: 'EnumType', id: string, name: string, typeKind: Types.TypeKind }
  & EnumTypeFragment
);

export type Type_InterfaceType_Fragment = (
  { __typename: 'InterfaceType', id: string, name: string, typeKind: Types.TypeKind }
  & InterfaceFragment
);

export type Type_LambdaType_Fragment = (
  { __typename: 'LambdaType', id: string, name: string, typeKind: Types.TypeKind }
  & LambdaTypeFragment
);

export type Type_PrimitiveType_Fragment = (
  { __typename: 'PrimitiveType', id: string, name: string, typeKind: Types.TypeKind }
  & PrimitiveTypeFragment
);

export type TypeFragment = Type_ArrayType_Fragment | Type_ComponentType_Fragment | Type_ElementType_Fragment | Type_EnumType_Fragment | Type_InterfaceType_Fragment | Type_LambdaType_Fragment | Type_PrimitiveType_Fragment;

export const TypeFragmentDoc = gql`
    fragment Type on Type {
  __typename
  id
  name
  typeKind
  ...ArrayType
  ...EnumType
  ...Interface
  ...PrimitiveType
  ...ElementType
  ...LambdaType
  ...ComponentType
}
    ${ArrayTypeFragmentDoc}
${EnumTypeFragmentDoc}
${InterfaceFragmentDoc}
${PrimitiveTypeFragmentDoc}
${ElementTypeFragmentDoc}
${LambdaTypeFragmentDoc}
${ComponentTypeFragmentDoc}`;