import * as addPlugin from '@graphql-codegen/add'
import type { PluginFunction, Types } from '@graphql-codegen/plugin-helpers'
import * as typedDocumentNodePlugin from '@graphql-codegen/typed-document-node'
import * as typescriptPlugin from '@graphql-codegen/typescript'
import * as typescriptOperationPlugin from '@graphql-codegen/typescript-operations'
import {
  ClientSideBaseVisitor,
  DocumentMode,
} from '@graphql-codegen/visitor-plugin-common'
import { processSources } from './process-sources'

export type ClientPresetConfig = {}

export const preset: Types.OutputPreset<ClientPresetConfig> = {
  prepareDocuments: (outputFilePath, outputSpecificDocuments) => [
    ...outputSpecificDocuments,
    `!${outputFilePath}`,
  ],
  buildGeneratesSection: (options) => {
    const visitor = new ClientSideBaseVisitor(
      options.schemaAst!,
      [],
      options.config,
      options.config,
    )

    const sourcesWithOperations = processSources(options.documents, (node) =>
      node.kind === 'FragmentDefinition'
        ? visitor.getFragmentVariableName(node)
        : visitor.getOperationVariableName(node),
    )

    const sources = sourcesWithOperations.map(({ source }) => source)

    const tdnFinished = createDeferred()

    const pluginMap = {
      ...options.pluginMap,
      [`add`]: addPlugin,
      [`typescript`]: typescriptPlugin,
      [`typescript-operations`]: typescriptOperationPlugin,
      [`typed-document-node`]: {
        ...typedDocumentNodePlugin,
        plugin: async (...args: Parameters<PluginFunction>) => {
          try {
            return await typedDocumentNodePlugin.plugin(...args)
          } finally {
            tdnFinished.resolve()
          }
        },
      },
    }

    const plugins: Array<Types.ConfiguredPlugin> = [
      { [`add`]: { content: `/* eslint-disable */` } },
      { [`typescript`]: {} },
      { [`typescript-operations`]: {} },
      { [`typed-document-node`]: {} },
    ]

    return [
      /**
       * create index.ts file to export generated types
       */
      {
        filename: `${options.baseOutputDir}index.ts`,
        pluginMap: { [`add`]: addPlugin },
        plugins: [{ [`add`]: { content: `export * from './graphql'\n` } }],
        schema: options.schema,
        config: {},
        documents: [],
        documentTransforms: options.documentTransforms,
      },
      /**
       * create gql file which contain generated fragments and operations
       */
      {
        filename: `${options.baseOutputDir}graphql.ts`,
        plugins,
        pluginMap,
        schema: options.schema,
        config: {
          documentMode: DocumentMode.string,
        },
        documents: sources,
        documentTransforms: options.documentTransforms,
      },
    ]
  },
}

type Deferred<T = void> = {
  resolve: (value: T) => void
  reject: (value: unknown) => void
  promise: Promise<T>
}

function createDeferred<T = void>(): Deferred<T> {
  const d = {} as Deferred<T>
  d.promise = new Promise<T>((resolve, reject) => {
    d.resolve = resolve
    d.reject = reject
  })
  return d
}
