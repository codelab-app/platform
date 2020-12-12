import { EdgeDefinition, NodeDefinition } from 'cytoscape'

const nodeA: NodeDefinition = { data: { id: 'a' } }
const nodeB: NodeDefinition = { data: { id: 'b' } }
const nodeC: NodeDefinition = { data: { id: 'c' } }
const nodeD: NodeDefinition = { data: { id: 'd' } }

const edgeA: EdgeDefinition = {
  data: {
    id: 'ab',
    source: 'a',
    target: 'b',
  },
}

const edgeB: EdgeDefinition = {
  data: {
    id: 'ac',
    source: 'a',
    target: 'c',
  },
}

const edgeC: EdgeDefinition = {
  data: {
    id: 'ad',
    source: 'a',
    target: 'd',
  },
}

export const nodes = [nodeA, nodeB, nodeC, nodeD]

export const edges = [edgeA, edgeB, edgeC]
