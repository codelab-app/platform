import { getEnv } from '@codelab/shared/config'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import {
  type QueryKey,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query'
import type { OperationDefinitionNode } from 'graphql'
import request from 'graphql-request'
// Hooks inspired by GraphQL Code Generator’s recommendations:
// https://the-guild.dev/graphql/codegen/docs/guides/react-vue#appendix-i-react-query-with-a-custom-fetcher-setup

/**
 * https://github.com/dotansimha/graphql-code-generator/discussions/9115
 *
 * Hook for GraphQL Queries. Uses `@tanstack/react-query`.
 *
 * @param document - The GraphQL query document
 * @param variables - The variables for the document
 * @returns Tanstack query result.
 */
export const useGraphqlQuery = <ResultT, VariablesT>(
  document: TypedDocumentNode<ResultT, VariablesT>,
  variables: Strict<VariablesT>,
): UseQueryResult<ResultT> => {
  const operationName = (document.definitions[0] as OperationDefinitionNode)
    .name?.value

  if (!operationName) {
    throw new Error(`Could not find operation name for document: ${document}`)
  }

  const key = [operationName, variables] as const

  return useQuery({
    queryFn: async ({ queryKey }) =>
      // Use `queryKey[1]` via the context to reduce closure scope (I think)
      request(getEnv().endpoint.apiGraphqlUrl, document, queryKey[1]),
    /* eslint-disable-next-line @tanstack/query/exhaustive-deps -- Using
		   operation name should uniquely represent the document, so we do not need
		   the entire document in the query key. Also see GraphQL Code Generator’s
		   recommendation (link at top of file). */
    queryKey: key,
  })
}

/** Helper type to force empty object to undefined. */
export type Strict<T> = T extends Record<string, never>
  ? undefined
  : NonNullable<T>
// Bike-shed this helper name. `Strict` does not feel exactly right.
