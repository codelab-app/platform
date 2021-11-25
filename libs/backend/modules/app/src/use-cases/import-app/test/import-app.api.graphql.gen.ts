import * as Types from '@codelab/frontend/abstract/codegen'

import { TestAppFragment } from '../../../test/test-app.fragment.graphql.gen'
import { PageFullFragment } from '../../../../../../../frontend/modules/page/src/graphql/PageFull.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestAppFragmentDoc } from '../../../test/test-app.fragment.graphql.gen'
import { PageFullFragmentDoc } from '../../../../../../../frontend/modules/page/src/graphql/PageFull.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestImportAppMutationVariables = Types.Exact<{
  input: Types.ImportAppInput
}>

export type TestImportAppMutation = {
  importApp: { pages: Array<PageFullFragment> } & TestAppFragment
}

export const TestImportAppGql = gql`
  mutation TestImportApp($input: ImportAppInput!) {
    importApp(input: $input) {
      ...TestApp
      pages {
        ...PageFull
      }
    }
  }
  ${TestAppFragmentDoc}
  ${PageFullFragmentDoc}
`
export type TestImportAppMutationFn = Apollo.MutationFunction<
  TestImportAppMutation,
  TestImportAppMutationVariables
>

/**
 * __useTestImportAppMutation__
 *
 * To run a mutation, you first call `useTestImportAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestImportAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testImportAppMutation, { data, loading, error }] = useTestImportAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestImportAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestImportAppMutation,
    TestImportAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestImportAppMutation,
    TestImportAppMutationVariables
  >(TestImportAppGql, options)
}
export type TestImportAppMutationHookResult = ReturnType<
  typeof useTestImportAppMutation
>
export type TestImportAppMutationResult =
  Apollo.MutationResult<TestImportAppMutation>
export type TestImportAppMutationOptions = Apollo.BaseMutationOptions<
  TestImportAppMutation,
  TestImportAppMutationVariables
>
