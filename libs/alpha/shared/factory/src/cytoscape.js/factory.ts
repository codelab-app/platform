import cytoscape from 'cytoscape'
import { cyMapEdges, cyMapVertices } from './mapper'
import { D3GraphProps } from '@codelab/alpha/ui/d3'
import { GraphFragmentsFragment } from '@codelab/generated'

export const makeCytoscape = ({ vertices, edges }: GraphFragmentsFragment) => {
  return cytoscape({
    headless: true,
    elements: {
      nodes: cyMapVertices(vertices),
      edges: cyMapEdges(edges),
    },
  })
}

export const makeD3 = ({
  vertices,
  edges,
}: GraphFragmentsFragment): D3GraphProps => {
  const nodes = vertices.map((vertex) => ({
    id: vertex.id,
    label: vertex.type,
  }))
  const links = edges.map((edge) => ({
    id: edge.id,
    label: edge.type,
    source: edge.source,
    target: edge.target,
  }))

  return {
    nodes,
    links,
  }
}
