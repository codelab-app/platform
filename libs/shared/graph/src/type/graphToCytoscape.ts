import cytoscape from 'cytoscape'
import { ITypeGraph } from './contracts'

export const graphToCytoscape = (graph?: ITypeGraph | null) => {
  const { edges, vertices } = graph ?? { edges: [], vertices: [] }

  return cytoscape({
    headless: true,
    elements: {
      nodes: vertices.map((v) => ({
        data: { ...v },
      })),
      edges: edges.map((v) => ({
        data: { ...v, id: v.field?.id },
      })),
    },
  })
}
