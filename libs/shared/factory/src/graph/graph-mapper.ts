import { ApolloQueryResult } from '@apollo/client'
import objectMapper from 'object-mapper'
import { GraphA } from '@codelab/shared/interface/graph-v2'
import { GraphsQueryResult } from '@codelab/state/apollo'

export type ApolloQueryMapper<
  TDataI extends Partial<ApolloQueryResult<any>>,
  TDataO
> = (results: Partial<TDataI>) => TDataO

/**
 * Maps from apollo query results to EntityA
 */
export const graphQueryToGraphAMapper: ApolloQueryMapper<
  GraphsQueryResult,
  GraphA
> = (original) => {
  const graphMapper = {
    id: 'id',
    label: 'label',
    vertices: 'vertices',
    edges: 'edges',
  }

  const resultsMapper = {
    'data.graph': {
      // TODO: can we remove this
      key: 'graph',
      transform: (sourceValue: Array<any>) => {
        return sourceValue.map((graph) => {
          return objectMapper(graph, graphMapper)
        })
      },
    },
  }

  const { graph } = objectMapper(original, resultsMapper)

  return graph
}
