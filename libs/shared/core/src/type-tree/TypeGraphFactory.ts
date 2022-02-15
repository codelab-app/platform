import {
  IField,
  IGraph,
  IInterfaceType,
  IType,
  ITypeEdge,
  ITypeGraph,
  IUnionType,
} from '@codelab/shared/abstract/core'
import { flatMap } from 'lodash'

export const TypeGraphFactory = {
  unionType(
    unionRoot: IUnionType,
    unionTypes: Array<IType>,
  ): IGraph<IType, ITypeEdge> {
    return {
      vertices: [unionRoot, ...unionTypes],
      edges: unionTypes.map((type) => ({
        source: unionRoot.id,
        target: type.id,
      })),
    }
  },

  interfaceType(
    interfaceRoot: IInterfaceType,
    fieldTypes: Array<IType>,
    fields: Array<IField>,
  ): IGraph<IType, ITypeEdge> {
    return {
      vertices: [interfaceRoot, ...fieldTypes],
      edges: fields,
    }
  },

  fromMultipleGraphs(...graphs: Array<ITypeGraph>): IGraph<IType, ITypeEdge> {
    const duplicateSet = new Set<string>()
    const allVertices = flatMap(graphs, (graph) => graph.vertices)

    const uniqueVertices = allVertices.filter((vertex) => {
      if (duplicateSet.has(vertex.id)) {
        return false
      }

      duplicateSet.add(vertex.id)

      return true
    })

    const allEdges = flatMap(graphs, (graph) => graph.edges)

    const uniqueEdges = allEdges.filter((edge) => {
      const key = `${edge.source}-${edge.target}`

      if (duplicateSet.has(key)) {
        return false
      }

      duplicateSet.add(key)

      return true
    })

    return { vertices: uniqueVertices, edges: uniqueEdges }
  },
}
