import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestGetComponentElementsQueryVariables = Types.Exact<{
  input: Types.GetComponentInput;
}>;


export type TestGetComponentElementsQuery = { getComponentElements?: { edges: Array<{ order?: number | null | undefined, source: string, target: string }>, vertices: Array<{ id: string, name: string } | { __typename: 'Element', id: string, name: string, css?: string | null | undefined, props: string }> } | null | undefined };


export const TestGetComponentElementsGql = `
    query TestGetComponentElements($input: GetComponentInput!) {
  getComponentElements(input: $input) {
    edges {
      order
      source
      target
    }
    vertices {
      ... on Component {
        id
        name
      }
      ... on Element {
        __typename
        id
        name
        css
        props
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetComponentElements(variables: TestGetComponentElementsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetComponentElementsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetComponentElementsQuery>(TestGetComponentElementsGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetComponentElements');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;