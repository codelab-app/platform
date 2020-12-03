import { EdgeCollection, NodeCollection, NodeSingular } from 'cytoscape'
import { EdgeEntity } from '../edge/edge.entity'
import { VertexEntity } from '../vertex/vertex.entity'
import { GraphEntity, VertexID } from './graph.entity'
import { NodeType } from '@codelab/shared/interface/node'

let g: GraphEntity
let list: VertexEntity
let item1: VertexEntity
let item2: VertexEntity
let item3: VertexEntity

function addThreeItemsToList(
  graph: GraphEntity,
  list: VertexEntity,
  item1: VertexEntity,
  item2: VertexEntity,
  item3: VertexEntity,
) {
  g.addVertices([list, item1, item2, item3])
  g.addEdge(list.id, item1.id)
  g.addEdge(list.id, item2.id)
  g.addEdge(list.id, item3.id)
}

function getEdgeTargetIds(edges: Array<EdgeEntity>): Array<string> {
  return edges.map((e: EdgeEntity) => e.target)
}

function resetEdgesAndVertices(graph: GraphEntity) {
  graph.vertices = []
  graph.edges = []
}

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
    resetEdgesAndVertices(g)
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
    addThreeItemsToList(g, list, item1, item2, item3)

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
    addThreeItemsToList(g, list, item1, item2, item3)

    const { cy } = g
    const newG: GraphEntity = g.makeGraphEntity(cy)

    expect(g).toMatchObject(newG)
  })

  it('Should make cytoscape object', () => {
    addThreeItemsToList(g, list, item1, item2, item3)

    const { cy } = g
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
    addThreeItemsToList(g, list, item1, item2, item3)

    const { cy } = g
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

  it('should move with different parent', () => {
    const root = new VertexEntity()

    root.id = 'root'
    root.type = NodeType.React_Html_Div

    const a = new VertexEntity()

    a.id = 'a'
    a.type = NodeType.React_List

    const b = new VertexEntity()

    b.id = 'b'
    b.type = NodeType.React_List_Item

    const c = new VertexEntity()

    c.id = 'c'
    c.type = NodeType.React_List_Item

    const d = new VertexEntity()

    d.id = 'd'
    d.type = NodeType.React_List

    const e = new VertexEntity()

    e.id = 'e'
    e.type = NodeType.React_List_Item

    g.addVertices([root, a, b, c, d, e])
    g.addEdge(root.id, a.id)
    g.addEdge(root.id, d.id)
    g.addEdge(a.id, b.id)
    g.addEdge(a.id, c.id)
    g.addEdge(d.id, e.id)

    g.moveVertex(c.id, e.id)

    const { cy } = g
    const rooot: NodeSingular = cy.elements().roots().first()
    const queue: Array<string> = []

    // Looks like using BFS to confirm the order is not reliable, produces wrong results
    cy.elements().breadthFirstSearch({
      root: `#${rooot.id()}`,
      visit: (node: NodeSingular) => {
        queue.push(node.id())
      },
    })

    const expectedEdges: Array<{
      source: VertexID
      target: VertexID
      order: number
    }> = g.edges.map((e: EdgeEntity) => {
      return {
        source: e.source,
        target: e.target,
        order: e.order,
      }
    })

    expect(expectedEdges[0]).toMatchObject({
      source: 'root',
      target: 'a',
      order: 0,
    })
    expect(expectedEdges[1]).toMatchObject({
      source: 'root',
      target: 'd',
      order: 1,
    })
    expect(expectedEdges[2]).toMatchObject({
      source: 'a',
      target: 'b',
      order: 2,
    })
    expect(expectedEdges[3]).toMatchObject({
      source: 'd',
      target: 'c',
      order: 3,
    })
    expect(expectedEdges[4]).toMatchObject({
      source: 'd',
      target: 'e',
      order: 4,
    })
    expect(queue).toMatchObject([root.id, a.id, d.id, b.id, c.id, e.id])
  })

  it('should move vertices with same parent', () => {
    const item4 = new VertexEntity()

    item4.id = 'd'
    item4.type = NodeType.React_List_Item

    const item5 = new VertexEntity()

    item5.id = 'e'
    item5.type = NodeType.React_List_Item
    g.addVertices([list, item1, item2, item3, item4, item5])
    g.addEdge(list.id, item1.id)
    g.addEdge(list.id, item2.id)
    g.addEdge(list.id, item3.id)
    g.addEdge(list.id, item4.id)
    g.addEdge(list.id, item5.id)

    g.moveVertex(item4.id, item1.id)

    const { cy } = g
    const root: NodeSingular = cy.elements().roots().first()
    const queue: Array<string> = []

    // Looks like using BFS to confirm the order is not reliable, produces wrong results
    cy.elements().breadthFirstSearch({
      root: `#${root.id()}`,
      visit: (node: NodeSingular) => {
        queue.push(node.id())
      },
    })

    const expectedEdges: Array<{
      source: VertexID
      target: VertexID
      order: number
    }> = g.edges.map((e: EdgeEntity) => {
      return {
        source: e.source,
        target: e.target,
        order: e.order,
      }
    })

    expect(expectedEdges[0]).toMatchObject({
      source: 'list',
      target: 'a',
      order: 0,
    })
    expect(expectedEdges[1]).toMatchObject({
      source: 'list',
      target: 'd',
      order: 1,
    })
    expect(expectedEdges[2]).toMatchObject({
      source: 'list',
      target: 'b',
      order: 2,
    })
    expect(expectedEdges[3]).toMatchObject({
      source: 'list',
      target: 'c',
      order: 3,
    })
    expect(expectedEdges[4]).toMatchObject({
      source: 'list',
      target: 'e',
      order: 4,
    })
    expect(queue).toMatchObject([
      list.id,
      item1.id,
      item4.id,
      item2.id,
      item3.id,
      item5.id,
    ])
  })

  it('Should move vertices', () => {
    addThreeItemsToList(g, list, item1, item2, item3)

    g.moveVertex(item3.id, item1.id)

    const { cy } = g
    const root: NodeSingular = cy.elements().roots().first()
    const queue: Array<string> = []

    cy.elements().breadthFirstSearch({
      root: `#${root.id()}`,
      visit: (node) => {
        queue.push(node.id())
      },
    })
    expect(queue).toMatchObject([list.id, item1.id, item3.id, item2.id])
  })
})
