import * as Types from '@codelab/frontend/abstract/codegen'

import { TypeGraphFragment } from '../../../../../../frontend/modules/type/src/graphql/TypeGraph.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TypeGraphFragmentDoc } from '../../../../../../frontend/modules/type/src/graphql/TypeGraph.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestGetExportAtomsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetAtomsInput>
}>

export type TestGetExportAtomsQuery = {
  getAtoms?: Array<TestGetExport__AtomsFragment> | null | undefined
}

export type TestGetExport__AtomsFragment = {
  id: string
  name: string
  type: Types.AtomType
  api: {
    id: string
    name: string
    typeKind: Types.TypeKind
    typeGraph: TypeGraphFragment
  }
}

export const TestGetExport__AtomsFragmentDoc = gql`
  fragment TestGetExport__Atoms on Atom {
    id
    name
    type
    api {
      id
      name
      typeKind
      typeGraph {
        ...TypeGraph
      }
    }
  }
  ${TypeGraphFragmentDoc}
`
export const TestGetExportAtomsGql = gql`
  query TestGetExportAtoms($input: GetAtomsInput) {
    getAtoms(input: $input) {
      ...TestGetExport__Atoms
    }
  }
  ${TestGetExport__AtomsFragmentDoc}
`

/**
 * __useTestGetExportAtomsQuery__
 *
 * To run a query within a React component, call `useTestGetExportAtomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetExportAtomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetExportAtomsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetExportAtomsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TestGetExportAtomsQuery,
    TestGetExportAtomsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    TestGetExportAtomsQuery,
    TestGetExportAtomsQueryVariables
  >(TestGetExportAtomsGql, options)
}
export function useTestGetExportAtomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetExportAtomsQuery,
    TestGetExportAtomsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    TestGetExportAtomsQuery,
    TestGetExportAtomsQueryVariables
  >(TestGetExportAtomsGql, options)
}
export type TestGetExportAtomsQueryHookResult = ReturnType<
  typeof useTestGetExportAtomsQuery
>
export type TestGetExportAtomsLazyQueryHookResult = ReturnType<
  typeof useTestGetExportAtomsLazyQuery
>
export type TestGetExportAtomsQueryResult = Apollo.QueryResult<
  TestGetExportAtomsQuery,
  TestGetExportAtomsQueryVariables
>
export function refetchTestGetExportAtomsQuery(
  variables?: TestGetExportAtomsQueryVariables,
) {
  return { query: TestGetExportAtomsGql, variables: variables }
}
