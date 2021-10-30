import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestGetTypesQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetTypesInput>;
}>;


export type TestGetTypesQuery = { getTypes: Array<{ __typename: 'ArrayType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'ComponentType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'ElementType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'EnumType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'InterfaceType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'LambdaType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'PrimitiveType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'ReactNodeType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'RenderPropsType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'UnionType', id: string, name: string, typeKind: Types.TypeKind }> };


export const TestGetTypesGql = `
    query TestGetTypes($input: GetTypesInput) {
  getTypes(input: $input) {
    __typename
    id
    name
    typeKind
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetTypes(variables?: TestGetTypesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetTypesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetTypesQuery>(TestGetTypesGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetTypes');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;