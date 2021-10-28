import * as Types from '@codelab/shared/codegen/graphql';

import { Type_ArrayType_Fragment, Type_ComponentType_Fragment, Type_ElementType_Fragment, Type_EnumType_Fragment, Type_InterfaceType_Fragment, Type_LambdaType_Fragment, Type_PrimitiveType_Fragment, Type_ReactNodeType_Fragment, Type_RenderPropsType_Fragment, Type_UnionType_Fragment } from '../../../graphql/Type.fragment.graphql.gen';
import { TypeFragmentDoc } from '../../../graphql/Type.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetTypeQueryVariables = Types.Exact<{
  input: Types.GetTypeInput;
}>;


export type GetTypeQuery = { getType?: Type_ArrayType_Fragment | Type_ComponentType_Fragment | Type_ElementType_Fragment | Type_EnumType_Fragment | Type_InterfaceType_Fragment | Type_LambdaType_Fragment | Type_PrimitiveType_Fragment | Type_ReactNodeType_Fragment | Type_RenderPropsType_Fragment | Type_UnionType_Fragment | null | undefined };


export const GetTypeGql = `
    query GetType($input: GetTypeInput!) {
  getType(input: $input) {
    ...Type
  }
}
    ${TypeFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetType: build.query<GetTypeQuery, GetTypeQueryVariables>({
      query: (variables) => ({ document: GetTypeGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetTypeQuery, useLazyGetTypeQuery } = injectedRtkApi;

