import cytoscape, {
  EdgeCollection,
  NodeCollection,
  NodeSingular,
} from 'cytoscape'
import { v4 as uuidv4 } from 'uuid'
import { VertexEntity } from '../vertex/vertex.entity'
import { GraphEntity } from './graph.entity'
import { NodeType } from '@codelab/shared/interface/node'

let g: GraphEntity
let list: VertexEntity
let item0: VertexEntity
let item1: VertexEntity
let item2: VertexEntity

describe('GraphEntity', () => {
  beforeAll(() => {
    g = new GraphEntity()
    g.vertices = []
    g.edges = []

    list = new VertexEntity()
    list.id = uuidv4()
    list.type = NodeType.React_List

    item0 = new VertexEntity()
    item0.id = uuidv4()
    item0.type = NodeType.React_List_Item

    item1 = new VertexEntity()
    item1.id = uuidv4()
    item1.type = NodeType.React_List_Item

    item2 = new VertexEntity()
    item2.id = uuidv4()
    item2.type = NodeType.React_List_Item
  })

  afterEach(() => {
    g.vertices = []
    g.edges = []
  })

  it('Should add vertices using addVertices function', () => {
    g.addVertices([list, item0, item1, item2])
    expect(g.vertices).toStrictEqual([list, item0, item1, item2])
  })

  it('Should add vertices using addVertex function', () => {
    g.addVertex(list)
    g.addVertex(item0)
    g.addVertex(item1)
    g.addVertex(item2)
    expect(g.vertices).toStrictEqual([list, item0, item1, item2])
  })

  it('Should not add vertex more then once', () => {
    g.addVertex(list)
    g.addVertices([list, item0, item1, item2])
    expect(g.vertices).toStrictEqual([list, item0, item1, item2])
  })

  it('Should have correct parent', () => {
    g.addVertices([list, item0, item1, item2])
    g.addEdge(list.id, item0.id)
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)

    expect(g.vertices[1].parent).toEqual(g.vertices[0].id)
    expect(g.vertices[2].parent).toEqual(g.vertices[0].id)
    expect(g.vertices[3].parent).toEqual(g.vertices[0].id)
  })

  it('Should throw error if vertex source does not exist', () => {
    expect(() => g.addEdge(list.id, item0.id)).toThrowError(
      `Vertex with source id ${list.id} does not exist`,
    )
  })

  it('Should throw error if vertex target does not exist', () => {
    g.addVertex(list)
    expect(() => g.addEdge(list.id, item0.id)).toThrowError(
      `Vertex with target id: ${item0.id} was not found`,
    )
  })

  it('should make GraphEntity from cytoscape object', () => {
    g.addVertices([list, item0, item1, item2])
    g.addEdge(list.id, item0.id)
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)

    const cy: cytoscape.Core = g.makeCytoscape(g)
    const newG: GraphEntity = g.makeGraphEntity(cy)

    expect(g).toMatchObject(newG)
  })

  it('Should make cytoscape object', () => {
    g.addVertices([list, item0, item1, item2])
    g.addEdge(list.id, item0.id)
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)

    const cy: cytoscape.Core = g.makeCytoscape(g)
    const nodes: NodeCollection = cy.nodes()
    const edges: EdgeCollection = cy.edges()

    expect(nodes.nonempty()).toBeTruthy()
    expect(edges.nonempty()).toBeTruthy()

    expect(nodes.getElementById(list.id)).toBeDefined()
    expect(nodes.getElementById(item0.id)).toBeDefined()
    expect(nodes.getElementById(item1.id)).toBeDefined()
    expect(nodes.getElementById(item2.id)).toBeDefined()

    expect(nodes.getElementById(list.id).isParent()).toBeTruthy()
    expect(nodes.getElementById(item0.id).isChild()).toBeTruthy()
    expect(nodes.getElementById(item1.id).isChild()).toBeTruthy()
    expect(nodes.getElementById(item2.id).isChild()).toBeTruthy()
  })

  it('Can traverse graph using BFS', () => {
    g.addVertices([list, item0, item1, item2])
    g.addEdge(list.id, item0.id)
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)

    const cy: cytoscape.Core = g.makeCytoscape(g)
    const root: NodeSingular = cy.elements().roots().first()
    const queue: Array<string> = []

    cy.elements().breadthFirstSearch({
      root: `#${root.id()}`,
      visit: (node) => {
        queue.push(node.id())
      },
    })
    expect(queue).toMatchObject([list.id, item0.id, item1.id, item2.id])
  })

  it('Should move vertices', () => {
    g.addVertices([list, item0, item1, item2])
    g.addEdge(list.id, item0.id)
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)

    g.moveVertex(item2.id, item0.id)

    const cy: cytoscape.Core = g.makeCytoscape(g)
    const root: NodeSingular = cy.elements().roots().first()
    const queue: Array<string> = []

    cy.elements().breadthFirstSearch({
      root: `#${root.id()}`,
      visit: (node) => {
        queue.push(node.id())
      },
    })

    expect(queue).toMatchObject([list.id, item2.id, item0.id, item1.id])
  })

  it('should move Vertices using cytoscape', () => {
    g.addVertices([list, item0, item1, item2])
    g.addEdge(list.id, item0.id)
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)

    const cy: cytoscape.Core = g.makeCytoscape(g)

    g.moveUsingCytoscape(cy, item2.id, item0.id)

    const root: NodeSingular = cy.elements().roots().first()
    const queue: Array<string> = []

    cy.elements().breadthFirstSearch({
      root: `#${root.id()}`,
      visit: (node) => {
        queue.push(node.id())
      },
    })
    const newG = g.makeGraphEntity(cy)

    // expect(queue).toMatchObject([list.id, item2.id, item0.id, item1.id])
  })

  it('Should throw error if vertex source does not exist when moving vertices', () => {
    g.addVertices([list, item0, item1, item2])
    g.addEdge(list.id, item0.id)
    g.addEdge(list.id, item1.id)

    expect(() => g.moveVertex(item2.id, item0.id)).toThrowError(
      `Vertex with source id ${item2.id} does not exist`,
    )
  })

  it('Should throw error if vertex target does not exist when moving vertices', () => {
    g.addVertices([list, item0, item1, item2])
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)

    expect(() => g.moveVertex(item2.id, item0.id)).toThrowError(
      `Vertex with target id ${item0.id} does not exist`,
    )
  })
})
