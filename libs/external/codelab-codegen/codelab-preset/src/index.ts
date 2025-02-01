import type { OperationOrFragment } from '@graphql-codegen/gql-tag-operations'
import type { PluginFunction, Types } from '@graphql-codegen/plugin-helpers'

import * as addPlugin from '@graphql-codegen/add'
import * as typedDocumentNodePlugin from '@graphql-codegen/typed-document-node'
import * as typescriptPlugin from '@graphql-codegen/typescript'
import * as typescriptOperationPlugin from '@graphql-codegen/typescript-operations'
import {
  ClientSideBaseVisitor,
  DocumentMode,
} from '@graphql-codegen/visitor-plugin-common'
import { Kind } from 'graphql'

export const preset: Types.OutputPreset = {
  buildGeneratesSection: (options) => {
    const visitor = new ClientSideBaseVisitor(
      options.schemaAst!,
      [],
      options.config,
      options.config,
    )

    const sourcesWithOperations = options.documents.map((source) => {
      const { document } = source

      const operations: Array<OperationOrFragment> = (
        document?.definitions || []
      )
        .filter(
          (definition) =>
            definition.kind === Kind.OPERATION_DEFINITION ||
            definition.kind === Kind.FRAGMENT_DEFINITION,
        )
        .map((definition) => ({
          definition,
          initialName:
            definition.kind === Kind.FRAGMENT_DEFINITION
              ? visitor.getFragmentVariableName(definition)
              : visitor.getOperationVariableName(definition),
        }))

      return { operations, source }
    })

    const sources = sourcesWithOperations.map(({ source }) => source)
    const tdnFinished = createDeferred()

    const pluginMap = {
      ...options.pluginMap,
      ['add']: addPlugin,
      ['typed-document-node']: {
        ...typedDocumentNodePlugin,
        plugin: async (...args: Parameters<PluginFunction>) => {
          try {
            return await typedDocumentNodePlugin.plugin(...args)
          } finally {
            tdnFinished.resolve()
          }
        },
      },
      ['typescript']: typescriptPlugin,
      ['typescript-operations']: typescriptOperationPlugin,
    }

    const plugins: Array<Types.ConfiguredPlugin> = [
      { ['add']: { content: '/* eslint-disable */' } },
      { ['typescript']: {} },
      { ['typescript-operations']: {} },
      { ['typed-document-node']: {} },
    ]

    return [
      /**
       * create index.ts file to export generated types
       */
      {
        config: {},
        documents: [],
        documentTransforms: options.documentTransforms,
        filename: `${options.baseOutputDir}index.ts`,
        pluginMap: { ['add']: addPlugin },
        plugins: [{ ['add']: { content: "export * from './graphql'\n" } }],
        schema: options.schema,
      },
      /**
       * create gql file which contain generated fragments and operations
       */
      {
        config: {
          documentMode: DocumentMode.string,
        },
        documents: sources,
        documentTransforms: options.documentTransforms,
        filename: `${options.baseOutputDir}graphql.ts`,
        pluginMap,
        plugins,
        schema: options.schema,
      },
    ]
  },
  prepareDocuments: (outputFilePath, outputSpecificDocuments) => [
    ...outputSpecificDocuments,
    `!${outputFilePath}`,
  ],
}

interface Deferred<T = void> {
  resolve(value: T): void
  reject(value: unknown): void
  promise: Promise<T>
}

const createDeferred = <T = void>(): Deferred<T> => {
  const d = {} as Deferred<T>

  d.promise = new Promise<T>((resolve, reject) => {
    d.resolve = resolve
    d.reject = reject
  })

  return d
}
