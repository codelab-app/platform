import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestGetElementQueryVariables = Types.Exact<{
  input: Types.GetElementInput;
}>;


export type TestGetElementQuery = { getElement?: { id: string, name: string, css?: string | null | undefined, props: string, renderForEachPropKey?: string | null | undefined, renderIfPropKey?: string | null | undefined, atom?: { id: string, name: string, type: Types.AtomType } | null | undefined, hooks: Array<{ id: string, type: Types.HookType, config: { __typename: 'GraphqlHookConfig', dataKey?: string | null | undefined, graphqlBody: string, graphqlUrl: string } | { __typename: 'QueryHookConfig', body?: string | null | undefined, lambdaId?: string | null | undefined, method?: Types.QueryMethod | null | undefined, queryKey: string, url?: string | null | undefined } | { __typename: 'RecoilStateHookConfig', defaultValue?: string | null | undefined, stateKey: string, persisted: Types.PersistenceType } | {} }>, propMapBindings: Array<{ id: string, sourceKey: string, targetElementId?: string | null | undefined, targetKey: string }> } | null | undefined };


export const TestGetElementGql = `
    query TestGetElement($input: GetElementInput!) {
  getElement(input: $input) {
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
    hooks {
      id
      type
      config {
        ... on QueryHookConfig {
          __typename
          body
          lambdaId
          method
          queryKey
          url
        }
        ... on RecoilStateHookConfig {
          defaultValue
          stateKey
          persisted
          __typename
        }
        ... on GraphqlHookConfig {
          graphqlBody: body
          dataKey
          graphqlUrl: url
          __typename
        }
      }
    }
    propMapBindings {
      id
      sourceKey
      targetElementId
      targetKey
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetElement(variables: TestGetElementQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetElementQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetElementQuery>(TestGetElementGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetElement');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;