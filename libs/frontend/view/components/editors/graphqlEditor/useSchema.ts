import { GraphQLSchema } from 'graphql'
import { defaultSchemaBuilder } from 'graphql-language-service'
import type { SchemaConfig } from 'monaco-graphql/esm/typings'
import { useCallback, useEffect, useState } from 'react'
import { GraphqlApi } from '../monaco/setupMonaco'

export type SchemaState = {
  schema: GraphQLSchema | null
  isLoading: boolean
  errors: Array<Error> | null
}

export const initialState: SchemaState = {
  isLoading: false,
  schema: null,
  errors: null,
}

export type SchemaHandlers = {
  loadCurrentSchema: () => Promise<void>
  setConfig: (config: SchemaConfig) => void
}

export const useSchema = (): SchemaState & SchemaHandlers => {
  const [state, setState] = useState({ ...initialState })
  const [config, setConfig] = useState<SchemaConfig>({ uri: '' })

  const loadCurrentSchema = useCallback(async () => {
    setState((s) => ({
      ...s,
      isLoading: true,
    }))

    try {
      const schema = await GraphqlApi.getSchema()

      setState((s) => ({
        ...s,
        isLoading: false,
        schema: schema ? defaultSchemaBuilder(schema as any) : null,
      }))
    } catch (error) {
      console.error(error)
      setState((s) => ({
        ...s,
        isLoading: false,
        errors: s.errors ? [...s.errors, error as any] : [error as any],
      }))
    }
  }, [setState])

  useEffect(() => {
    if (config) {
      GraphqlApi.setSchemaConfig(config)

      setTimeout(() => {
        loadCurrentSchema()
          .then(() => {
            console.log('got schema')
          })
          .catch((err) => console.error(err))
      }, 200)
    }
  }, [config, loadCurrentSchema])

  return {
    ...state,
    loadCurrentSchema,
    setConfig,
  }
}
