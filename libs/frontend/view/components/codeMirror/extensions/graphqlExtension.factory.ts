import type { Extension } from '@codemirror/state'
import type { GraphQLSchema } from 'graphql'

export const getRemoteSchema = async (
  endpoint: string,
): Promise<GraphQLSchema | undefined> => {
  try {
    const { buildClientSchema, getIntrospectionQuery } = await import(
      'graphql/utilities'
    )

    const { data, errors } = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    }).then((res) => res.json())

    if (errors) {
      console.log('Error ', errors)
    }

    return buildClientSchema(data)
  } catch (err) {
    console.log('Error ', err)

    return
  }
}

export const graphqlExtensionFactory = async (
  url: string,
): Promise<Array<Extension>> => {
  const [{ graphql }, schema] = await Promise.all([
    import('cm6-graphql'),
    getRemoteSchema(url),
  ])

  if (!schema) {
    return graphql()
  }

  return graphql(schema)
}
