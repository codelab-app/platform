import { GraphQLSchema } from 'graphql'
import {
  buildClientSchema,
  buildSchema,
  getIntrospectionQuery,
} from 'graphql/utilities'
import { useEffect, useState } from 'react'

export const useIntrospectGraphQLSchema = (serverUrl?: string) => {
  const [schema, setSchema] = useState<GraphQLSchema>(buildSchema(`type Query`))

  useEffect(() => {
    const fn = async () => {
      if (!serverUrl) {
        return
      }

      const introspectUrl = `${serverUrl}?query=${getIntrospectionQuery()}`

      try {
        const data = await fetch(introspectUrl)
        const json = await data.json()
        const parsedSchema = buildClientSchema(json.data)
        setSchema(parsedSchema)
      } catch (err) {
        console.error('Fail to get introspect graphql info', err)
      }
    }

    void fn()
  }, [serverUrl])

  return {
    schema,
  }
}
