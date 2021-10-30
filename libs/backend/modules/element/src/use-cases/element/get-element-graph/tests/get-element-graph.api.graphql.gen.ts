import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestGetElementGraphQueryVariables = Types.Exact<{
  input: Types.GetElementGraphInput;
}>;


export type TestGetElementGraphQuery = { getElementGraph?: { edges: Array<{ order?: number | null | undefined, source: string, target: string }>, vertices: Array<{ id: string, name: string } | { id: string, name: string, css?: string | null | undefined, props: string, renderForEachPropKey?: string | null | undefined, renderIfPropKey?: string | null | undefined, atom?: { id: string, name: string, type: Types.AtomType } | null | undefined }> } | null | undefined };


export const TestGetElementGraphGql = `
    query TestGetElementGraph($input: GetElementGraphInput!) {
  getElementGraph(input: $input) {
    edges {
      order
      source
      target
    }
    vertices {
      ... on Element {
        id
        name
        css
        props
        atom {
          id
          name
          type
        }
        renderForEachPropKey
        renderIfPropKey
      }
      ... on Component {
        id
        name
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetElementGraph(variables: TestGetElementGraphQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetElementGraphQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetElementGraphQuery>(TestGetElementGraphGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetElementGraph');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;