import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type GetTypeKindsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetTypesInput>;
}>;


export type GetTypeKindsQuery = { getTypes: Array<{ __typename: 'ArrayType', id: string, typeKind: Types.TypeKind } | { __typename: 'ComponentType', id: string, typeKind: Types.TypeKind } | { __typename: 'ElementType', id: string, typeKind: Types.TypeKind } | { __typename: 'EnumType', id: string, typeKind: Types.TypeKind } | { __typename: 'InterfaceType', id: string, typeKind: Types.TypeKind } | { __typename: 'LambdaType', id: string, typeKind: Types.TypeKind } | { __typename: 'PrimitiveType', id: string, typeKind: Types.TypeKind } | { __typename: 'ReactNodeType', id: string, typeKind: Types.TypeKind } | { __typename: 'RenderPropsType', id: string, typeKind: Types.TypeKind } | { __typename: 'UnionType', id: string, typeKind: Types.TypeKind }> };


export const GetTypeKindsGql = `
    query GetTypeKinds($input: GetTypesInput) {
  getTypes(input: $input) {
    id
    typeKind
    __typename
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetTypeKinds: build.query<GetTypeKindsQuery, GetTypeKindsQueryVariables | void>({
      query: (variables) => ({ document: GetTypeKindsGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetTypeKindsQuery, useLazyGetTypeKindsQuery } = injectedRtkApi;

