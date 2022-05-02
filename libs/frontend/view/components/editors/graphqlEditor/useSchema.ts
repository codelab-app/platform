import { Nullable } from '@codelab/shared/abstract/types'
import { GraphQLSchema } from 'graphql'
import { defaultSchemaBuilder } from 'graphql-language-service'
import { MonacoGraphQLAPI } from 'monaco-graphql/esm/api'
import { initializeMode } from 'monaco-graphql/esm/initializeMode'
import type { SchemaConfig } from 'monaco-graphql/esm/typings'
import { useCallback, useEffect, useRef, useState } from 'react'

export type SchemaState = {
  schema: Nullable<GraphQLSchema>
  isLoading: boolean
  errors: Nullable<Array<Error>>
}

const initialState: SchemaState = {
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
  const apiRef = useRef<MonacoGraphQLAPI>()

  const loadCurrentSchema = useCallback(async () => {
    setState((s) => ({
      ...s,
      isLoading: true,
    }))

    try {
      const schema = await apiRef.current?.schemas?.[0]

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
      apiRef.current = initializeMode({ schemas: [config] })

      setTimeout(() => {
        loadCurrentSchema()
          .then(() => {
            //
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
