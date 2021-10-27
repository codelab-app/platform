import * as Types from '@codelab/shared/codegen/graphql';

import { Type_ArrayType_Fragment, Type_ComponentType_Fragment, Type_ElementType_Fragment, Type_EnumType_Fragment, Type_InterfaceType_Fragment, Type_LambdaType_Fragment, Type_PrimitiveType_Fragment, Type_ReactNodeType_Fragment, Type_RenderPropsType_Fragment, Type_UnionType_Fragment } from '../../../graphql/Type.fragment.graphql.gen';
import { TypeFragmentDoc } from '../../../graphql/Type.fragment.graphql.gen';
import { api } from '@codelab/shared/codegen/graphql';
export type GetTypesQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetTypesInput>;
}>;


export type GetTypesQuery = { getTypes: Array<(
    { __typename: 'ArrayType' }
    & Type_ArrayType_Fragment
  ) | (
    { __typename: 'ComponentType' }
    & Type_ComponentType_Fragment
  ) | (
    { __typename: 'ElementType' }
    & Type_ElementType_Fragment
  ) | (
    { __typename: 'EnumType' }
    & Type_EnumType_Fragment
  ) | (
    { __typename: 'InterfaceType' }
    & Type_InterfaceType_Fragment
  ) | (
    { __typename: 'LambdaType' }
    & Type_LambdaType_Fragment
  ) | (
    { __typename: 'PrimitiveType' }
    & Type_PrimitiveType_Fragment
  ) | (
    { __typename: 'ReactNodeType' }
    & Type_ReactNodeType_Fragment
  ) | (
    { __typename: 'RenderPropsType' }
    & Type_RenderPropsType_Fragment
  ) | (
    { __typename: 'UnionType' }
    & Type_UnionType_Fragment
  )> };


export const GetTypesGql = `
    query GetTypes($input: GetTypesInput) {
  getTypes(input: $input) {
    __typename
    ...Type
  }
}
    ${TypeFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetTypes: build.query<GetTypesQuery, GetTypesQueryVariables | void>({
      query: (variables) => ({ document: GetTypesGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetTypesQuery, useLazyGetTypesQuery } = injectedRtkApi;

