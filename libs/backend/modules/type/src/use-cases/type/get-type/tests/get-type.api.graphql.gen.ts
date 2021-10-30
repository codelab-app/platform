import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestGetTypeQueryVariables = Types.Exact<{
  input: Types.GetTypeInput;
}>;


export type TestGetTypeQuery = { getType?: { __typename: 'ArrayType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'ComponentType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'ElementType', kind: Types.ElementTypeKind, id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'EnumType', id: string, name: string, typeKind: Types.TypeKind, allowedValues: Array<{ id: string, name?: string | null | undefined, value: string }> } | { __typename: 'InterfaceType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'LambdaType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'PrimitiveType', primitiveKind: Types.PrimitiveKind, id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'ReactNodeType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'RenderPropsType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'UnionType', id: string, name: string, typeKind: Types.TypeKind } | null | undefined };


export const TestGetTypeGql = `
    query TestGetType($input: GetTypeInput!) {
  getType(input: $input) {
    __typename
    id
    name
    typeKind
    ... on EnumType {
      allowedValues {
        id
        name
        value
      }
    }
    ... on ElementType {
      kind
    }
    ... on PrimitiveType {
      primitiveKind
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetType(variables: TestGetTypeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetTypeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetTypeQuery>(TestGetTypeGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetType');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;