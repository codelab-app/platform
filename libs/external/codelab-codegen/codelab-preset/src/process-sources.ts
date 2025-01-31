import type {
  OperationOrFragment,
  SourceWithOperations,
} from '@graphql-codegen/gql-tag-operations'
import type { Source } from '@graphql-tools/utils'
import type { FragmentDefinitionNode, OperationDefinitionNode } from 'graphql'

export type BuildNameFunction = (
  type: FragmentDefinitionNode | OperationDefinitionNode,
) => string

export const processSources = (
  sources: Array<Source>,
  buildName: BuildNameFunction,
) => {
  const sourcesWithOperations: Array<SourceWithOperations> = []

  for (const originalSource of sources) {
    const source = fixLinebreaks(originalSource)
    const { document } = source
    const operations: Array<OperationOrFragment> = []

    for (const definition of document?.definitions ?? []) {
      if (
        definition.kind !== 'OperationDefinition' &&
        definition.kind !== 'FragmentDefinition'
      ) {
        continue
      }

      if (definition.name?.kind !== 'Name') {
        if (definition.kind === 'OperationDefinition') {
          // eslint-disable-next-line no-console
          console.warn(
            `[client-preset] the following anonymous operation is skipped: ${source.rawSDL}`,
          )
        }

        continue
      }

      operations.push({
        definition,
        initialName: buildName(definition),
      })
    }

    if (operations.length === 0) {
      continue
    }

    sourcesWithOperations.push({
      operations,
      source,
    })
  }

  return sourcesWithOperations
}

const fixLinebreaks = (source: Source) => {
  const fixedSource = { ...source }

  fixedSource.rawSDL = source.rawSDL?.replace(/\r\n/g, '\n')

  return fixedSource
}
