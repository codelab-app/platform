import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestGetElementQueryVariables = Types.Exact<{
  input: Types.GetElementInput;
}>;


export type TestGetElementQuery = { getElement?: Types.Maybe<{ id: string, name: string, css?: Types.Maybe<string>, props: string, renderForEachPropKey?: Types.Maybe<string>, renderIfPropKey?: Types.Maybe<string>, atom?: Types.Maybe<{ id: string, name: string, type: Types.AtomType }>, hooks: Array<{ id: string, type: Types.HookType, config: { __typename: 'GraphqlQueryHookConfig', dataKey?: Types.Maybe<string>, graphqlBody: string, graphqlUrl: string } | { __typename: 'QueryHookConfig', body?: Types.Maybe<string>, lambdaId?: Types.Maybe<string>, method?: Types.Maybe<Types.QueryMethod>, queryKey: string, url?: Types.Maybe<string> } | { __typename: 'RecoilStateHookConfig', defaultValue?: Types.Maybe<string>, stateKey: string } }>, propMapBindings: Array<{ id: string, sourceKey: string, targetElementId?: Types.Maybe<string>, targetKey: string }> }> };


export const TestGetElementGql = gql`
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
          __typename
        }
        ... on GraphqlQueryHookConfig {
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

/**
 * __useTestGetElementQuery__
 *
 * To run a query within a React component, call `useTestGetElementQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetElementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetElementQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetElementQuery(baseOptions: Apollo.QueryHookOptions<TestGetElementQuery, TestGetElementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestGetElementQuery, TestGetElementQueryVariables>(TestGetElementGql, options);
      }
export function useTestGetElementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestGetElementQuery, TestGetElementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestGetElementQuery, TestGetElementQueryVariables>(TestGetElementGql, options);
        }
export type TestGetElementQueryHookResult = ReturnType<typeof useTestGetElementQuery>;
export type TestGetElementLazyQueryHookResult = ReturnType<typeof useTestGetElementLazyQuery>;
export type TestGetElementQueryResult = Apollo.QueryResult<TestGetElementQuery, TestGetElementQueryVariables>;
export function refetchTestGetElementQuery(variables?: TestGetElementQueryVariables) {
      return { query: TestGetElementGql, variables: variables }
    }