import { getEnv } from '@codelab/shared/config'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { OperationDefinitionNode } from 'graphql'
import request from 'graphql-request'
import type { Strict } from './use-query'

export const getMutationOptions = <ResultT, VariablesT>(
  document: TypedDocumentNode<ResultT, VariablesT>,
  variables: Strict<VariablesT>,
) => {
  const operationName = (document.definitions[0] as OperationDefinitionNode)
    .name?.value

  if (!operationName) {
    throw new Error(`Could not find operation name for document: ${document}`)
  }

  const key = [operationName, variables] as const

  return {
    mutationFn: async ({ queryKey }: { queryKey: typeof key }) =>
      request<ResultT>(getEnv().endpoint.apiGraphqlUrl, document, queryKey[1]),
    mutationKey: key,
  }
}
