import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ExportAtomsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetAtomsInput>;
}>;


export type ExportAtomsQuery = { exportAtoms?: Types.Maybe<{ payload: string }> };


export const ExportAtomsGql = gql`
    query ExportAtoms($input: GetAtomsInput) {
  exportAtoms(input: $input) {
    payload
  }
}
    `;

/**
 * __useExportAtomsQuery__
 *
 * To run a query within a React component, call `useExportAtomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportAtomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportAtomsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExportAtomsQuery(baseOptions?: Apollo.QueryHookOptions<ExportAtomsQuery, ExportAtomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportAtomsQuery, ExportAtomsQueryVariables>(ExportAtomsGql, options);
      }
export function useExportAtomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportAtomsQuery, ExportAtomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportAtomsQuery, ExportAtomsQueryVariables>(ExportAtomsGql, options);
        }
export type ExportAtomsQueryHookResult = ReturnType<typeof useExportAtomsQuery>;
export type ExportAtomsLazyQueryHookResult = ReturnType<typeof useExportAtomsLazyQuery>;
export type ExportAtomsQueryResult = Apollo.QueryResult<ExportAtomsQuery, ExportAtomsQueryVariables>;
export function refetchExportAtomsQuery(variables?: ExportAtomsQueryVariables) {
      return { query: ExportAtomsGql, variables: variables }
    }