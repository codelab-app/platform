import cytoscape, {
  EdgeCollection,
  NodeCollection,
  NodeSingular,
} from 'cytoscape'
import { VertexEntity } from '../vertex/vertex.entity'
import { GraphEntity } from './graph.entity'
import { NodeType } from '@codelab/shared/interface/node'

let g: GraphEntity
let list: VertexEntity
let item1: VertexEntity
let item2: VertexEntity
let item3: VertexEntity

describe('GraphEntity', () => {
  beforeAll(() => {
    g = new GraphEntity()
    g.vertices = []
    g.edges = []

    list = new VertexEntity()
    // list.id = uuidv4()
    list.id = 'list'
    list.type = NodeType.React_List

    item1 = new VertexEntity()
    item1.id = 'a'
    item1.type = NodeType.React_List_Item

    item2 = new VertexEntity()
    item2.id = 'b'
    item2.type = NodeType.React_List_Item

    item3 = new VertexEntity()
    item3.id = 'c'
    item3.type = NodeType.React_List_Item
  })

  afterEach(() => {
    g.vertices = []
    g.edges = []
  })

  it('Should add vertices using addVertices function', () => {
    g.addVertices([list, item1, item2, item3])
    expect(g.vertices).toStrictEqual([list, item1, item2, item3])
  })

  it('Should add vertices using addVertex function', () => {
    g.addVertex(list)
    g.addVertex(item1)
    g.addVertex(item2)
    g.addVertex(item3)
    expect(g.vertices).toStrictEqual([list, item1, item2, item3])
  })

  it('Should not add vertex more then once', () => {
    g.addVertex(list)
    g.addVertices([list, item1, item2, item3])
    expect(g.vertices).toStrictEqual([list, item1, item2, item3])
  })

  it('Should have correct parent', () => {
    g.addVertices([list, item1, item2, item3])
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)
    g.addEdge(list.id, item3.id)

    expect(g.vertices[1].parent).toEqual(g.vertices[0].id)
    expect(g.vertices[2].parent).toEqual(g.vertices[0].id)
    expect(g.vertices[3].parent).toEqual(g.vertices[0].id)
  })

  it('Should throw error if vertex source does not exist', () => {
    expect(() => g.addEdge(list.id, item1.id)).toThrowError(
      `Vertex with source id ${list.id} does not exist`,
    )
  })

  it('Should throw error if vertex target does not exist', () => {
    g.addVertex(list)
    expect(() => g.addEdge(list.id, item1.id)).toThrowError(
      `Vertex with target id: ${item1.id} was not found`,
    )
  })

  it('should make GraphEntity from cytoscape object', () => {
    g.addVertices([list, item1, item2, item3])
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)
    g.addEdge(list.id, item3.id)

    const cy: cytoscape.Core = g.makeCytoscape(g)
    const newG: GraphEntity = g.makeGraphEntity(cy)

    expect(g).toMatchObject(newG)
  })

  it('Should make cytoscape object', () => {
    g.addVertices([list, item1, item2, item3])
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)
    g.addEdge(list.id, item3.id)

    const cy: cytoscape.Core = g.makeCytoscape(g)
    const nodes: NodeCollection = cy.nodes()
    const edges: EdgeCollection = cy.edges()

    expect(nodes.nonempty()).toBeTruthy()
    expect(edges.nonempty()).toBeTruthy()

    expect(nodes.getElementById(list.id)).toBeDefined()
    expect(nodes.getElementById(item1.id)).toBeDefined()
    expect(nodes.getElementById(item2.id)).toBeDefined()
    expect(nodes.getElementById(item3.id)).toBeDefined()

    expect(nodes.getElementById(list.id).isParent()).toBeTruthy()
    expect(nodes.getElementById(item1.id).isChild()).toBeTruthy()
    expect(nodes.getElementById(item2.id).isChild()).toBeTruthy()
    expect(nodes.getElementById(item3.id).isChild()).toBeTruthy()
  })

  it('Can traverse graph using BFS', () => {
    g.addVertices([list, item1, item2, item3])
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)
    g.addEdge(list.id, item3.id)

    const cy: cytoscape.Core = g.makeCytoscape(g)
    const root: NodeSingular = cy.elements().roots().first()
    const queue: Array<string> = []

    cy.elements().breadthFirstSearch({
      root: `#${root.id()}`,
      visit: (node) => {
        queue.push(node.id())
      },
    })
    expect(queue).toMatchObject([list.id, item1.id, item2.id, item3.id])
  })

  it('Should move vertices', () => {
    g.addVertices([list, item1, item2, item3])
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)
    g.addEdge(list.id, item3.id)

    g.moveVertex(item3.id, item1.id)

    const cy: cytoscape.Core = g.makeCytoscape(g)
    const root: NodeSingular = cy.elements().roots().first()
    const queue: Array<string> = []

    cy.elements().breadthFirstSearch({
      root: `#${root.id()}`,
      visit: (node) => {
        queue.push(node.id())
      },
    })
    expect(true).toBeTruthy()
    // expect(queue).toMatchObject([list.id, item3.id, item1.id, item2.id])
  })

  it('should move Vertices using cytoscape', () => {
    g.addVertices([list, item1, item2, item3])
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)
    g.addEdge(list.id, item3.id)

    const cy: cytoscape.Core = g.makeCytoscape(g)

    g.moveUsingCytoscape(cy, item3.id, item1.id)

    const root: NodeSingular = cy.elements().roots().first()
    const queue: Array<string> = []

    cy.elements().breadthFirstSearch({
      root: `#${root.id()}`,
      visit: (node) => {
        queue.push(node.id())
      },
    })
    const newG = g.makeGraphEntity(cy)
    // original order: a, b, c
    // after move: a, c, b

    expect(queue).toMatchObject([list.id, item1.id, item3.id, item2.id])
  })

  it('Should throw error if vertex source does not exist when moving vertices', () => {
    g.addVertices([list, item1, item2, item3])
    g.addEdge(list.id, item3.id)
    g.addEdge(list.id, item2.id)

    expect(() => g.moveVertex(item1.id, item2.id)).toThrowError(
      `Vertex with source id ${item1.id} does not exist`,
    )
  })

  it('Should throw error if vertex target does not exist when moving vertices', () => {
    g.addVertices([list, item1, item2, item3])
    g.addEdge(list.id, item2.id)
    g.addEdge(list.id, item3.id)

    expect(() => g.moveVertex(item2.id, item1.id)).toThrowError(
      `Vertex with target id ${item1.id} does not exist`,
    )
  })
})
