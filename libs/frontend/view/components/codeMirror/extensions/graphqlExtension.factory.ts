import { Extension } from '@codemirror/state'
import { graphql as cm6Graphql } from 'cm6-graphql'
import { GraphQLSchema } from 'graphql'
import { buildClientSchema, getIntrospectionQuery } from 'graphql/utilities'

export const getRemoteSchema = async function (
  endpoint: string,
): Promise<GraphQLSchema | undefined> {
  try {
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
  // fetch schema
  const schema = await getRemoteSchema(url)

  if (!schema) {
    return cm6Graphql()
  }

  return cm6Graphql(schema)
}
