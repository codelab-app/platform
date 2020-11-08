import { Edge } from '../edge/edge'
import { Vertex } from '../vertex/vertex'
import { Graph } from './graph'

describe('Graph', () => {
  let graph: Graph
  const parent = Vertex.fromTestNode({ id: 'A' })

  beforeEach(() => {
    graph = new Graph({
      id: '',
      vertices: [parent],
      edges: [],
    })
  })

  it('adds a children to a vertex', async () => {
    // Set mocks & spys
    const spy = jest.spyOn(Edge, 'fromCreateForm')

    Vertex.fromCreateForm = jest.fn().mockReturnValue({
      id: 'B',
    })

    // Run functions
    const vertex = Vertex.fromTestNode({ id: 'B' })

    const child = await graph.addChild(parent, { id: 'B' })

    // expect(graph.vertices).toMatchObject([{ id: 'A' }, { id: 'B' }])
    expect(spy).toHaveBeenCalledWith({ start: 'A', end: 'B' })
  })
  // it('adds vertex from a node', () => {
  //   const graph = new Graph()
  //   const node = { id: 'A' }
  //   const vertex = new Vertex(node)

  //   expect(graph.vertices).toEqual([])
  //   graph.addVertexFromNode(node)
  //   expect(graph.vertices).toEqual([vertex])
  // })

  // it('adds edges from nodes', () => {
  //   const graph = new Graph()
  //   const startNode = { id: 'A' }
  //   const endNode = { id: 'B' }
  //   const edge = new Edge(startNode, endNode)

  //   graph.addEdgeFromNodes(startNode, endNode)
  //   expect(graph.edges).toEqual([edge])
  // })
})
