// specific graphql-request bundled by esbuild, ignores node code, utilizes web api only
// for edge run time: https://nextjs.org/docs/api-reference/edge-runtime
import { graphqlApiOrigin } from '@codelab/shared/config'
import type { DocumentNode } from 'graphql'
import { getOperationAST } from 'graphql'
import { print } from 'graphql/language/printer'

export const client = {
  request: async (
    ast: DocumentNode,
    variables: Record<string, string>,
    headers: Headers,
  ) => {
    const graphql = print(ast)
    const operation = getOperationAST(ast)
    const operationName = operation && operation.name?.value

    const data = await fetch(graphqlApiOrigin, {
      method: 'POST',
      headers: {
        ...headers,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: graphql,
        variables,
        operationName,
      }),
    })

    const body = await data.json()

    if (data.ok) {
      return body?.data || {}
    }

    throw new Error(`Error requesting ${operationName}
Body: ${JSON.stringify(body, null, 2)}`)
  },
}
