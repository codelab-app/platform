import cytoscape, {
  EdgeCollection,
  NodeCollection,
  NodeSingular,
} from 'cytoscape'
import { v4 as uuidv4 } from 'uuid'
import { Graph } from './graph'
import { VertexA } from '@codelab/shared/interface/graph-v2'
import { NodeType } from '@codelab/shared/interface/node'

let g: Graph
let list: VertexA
let item0: VertexA
let item1: VertexA
let item2: VertexA

describe('Graph', () => {
  beforeAll(() => {
    g = new Graph()
    list = {
      id: uuidv4(),
      label: 'list',
      type: NodeType.React_List,
    }
    item0 = {
      id: uuidv4(),
      label: 'item0',
      type: NodeType.React_List_Item,
    }
    item1 = {
      id: uuidv4(),
      label: 'item1',
      type: NodeType.React_List_Item,
    }
    item2 = {
      id: uuidv4(),
      label: 'item2',
      type: NodeType.React_List_Item,
    }
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
    g.addEdge(list, item0)
    g.addEdge(list, item1)
    g.addEdge(list, item2)

    expect(g.vertices[1].parent).toEqual(g.vertices[0].id)
    expect(g.vertices[2].parent).toEqual(g.vertices[0].id)
    expect(g.vertices[3].parent).toEqual(g.vertices[0].id)
  })

  it('Should throw error if vertex source does not exist', () => {
    expect(() => g.addEdge(list, item0)).toThrowError(
      `Vertex with source id ${list.id} does not exist`,
    )
  })

  it('Should throw error if vertex target does not exist', () => {
    g.addVertex(list)
    expect(() => g.addEdge(list, item0)).toThrowError(
      `Vertex with target id ${item0.id} does not exist`,
    )
  })

  it('Should make cytoscape object', () => {
    g.addVertices([list, item0, item1, item2])
    g.addEdge(list, item0)
    g.addEdge(list, item1)
    g.addEdge(list, item2)

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
    g.addEdge(list, item0)
    g.addEdge(list, item1)
    g.addEdge(list, item2)

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
    g.addEdge(list, item0)
    g.addEdge(list, item1)
    g.addEdge(list, item2)

    g.moveVertex(item2, item0)

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

  it('Should throw error if vertex source does not exist when moving vertices', () => {
    g.addVertices([list, item0, item1, item2])
    g.addEdge(list, item0)
    g.addEdge(list, item1)

    expect(() => g.moveVertex(item2, item0)).toThrowError(
      `Vertex with source id ${item2.id} does not exist`,
    )
  })

  it('Should throw error if vertex target does not exist when moving vertices', () => {
    g.addVertices([list, item0, item1, item2])
    g.addEdge(list, item1)
    g.addEdge(list, item2)

    expect(() => g.moveVertex(item2, item0)).toThrowError(
      `Vertex with target id ${item0.id} does not exist`,
    )
  })
})
