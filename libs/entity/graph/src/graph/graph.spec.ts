import { Graph } from './graph'
import { Edge } from './edge'
import { Vertex } from './vertex'

describe('Graph', () => {
  it('adds vertex from a node', () => {
    const graph = new Graph()
    const node = { id: 'A' }
    const vertex = new Vertex(node)

    expect(graph.vertices).toEqual([])
    graph.addVertexFromNode(node)
    expect(graph.vertices).toEqual([vertex])
  })

  it('adds edges from nodes', () => {
    const graph = new Graph()
    const startNode = { id: 'A' }
    const endNode = { id: 'B' }
    const edge = new Edge(startNode, endNode)

    graph.addEdgeFromNodes(startNode, endNode)
    expect(graph.edges).toEqual([edge])
  })
})
