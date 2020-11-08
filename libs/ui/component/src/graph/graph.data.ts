import { EdgeDefinition, NodeDefinition } from 'cytoscape'

export const demoNodes: Array<NodeDefinition> = [
  {
    data: {
      id: 'n0',
      props: {},
    },
  },
  {
    data: {
      id: 'n1-0',
      props: {},
    },
  },
  {
    data: {
      id: 'n1-1',
      props: {},
    },
  },
  {
    data: {
      id: 'n2-0',
      props: {},
    },
  },
]

export const demoEdges: Array<EdgeDefinition> = [
  {
    data: {
      source: 'n0',
      target: 'n1-0',
    },
  },
  {
    data: {
      source: 'n0',
      target: 'n1-1',
    },
  },
  {
    data: {
      source: 'n1-0',
      target: 'n2-0',
    },
  },
]
