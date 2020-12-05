import { Core, EdgeCollection, NodeCollection, NodeSingular } from 'cytoscape'
import { EdgeEntity } from '../edge/edge.entity'
import { VertexEntity } from '../vertex/vertex.entity'
import { GraphEntity, VertexID } from './graph.entity'
import { NodeType } from '@codelab/shared/interface/node'

let g: GraphEntity
let list: VertexEntity
let a: VertexEntity
let b: VertexEntity
let c: VertexEntity

const addThreeItemsToList = (
  graph: GraphEntity,
  list: VertexEntity,
  item1: VertexEntity,
  item2: VertexEntity,
  item3: VertexEntity,
) => {
  g.addVertices([list, item1, item2, item3])
  g.addEdge(list.id, item1.id)
  g.addEdge(list.id, item2.id)
  g.addEdge(list.id, item3.id)
}
const resetEdgesAndVertices = (graph: GraphEntity) => {
  graph.vertices = []
  graph.edges = []
}

export const createAtoEVertices = () => {
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

  return {
    root,
    a,
    b,
    c,
    d,
    e,
  }
}

const getBfsQueue = (cy: Core) => {
  const root: NodeSingular = cy.elements().roots().first()
  const queue: Array<string> = []

  cy.elements().breadthFirstSearch({
    root: `#${root.id()}`,
    visit: (node) => {
      queue.push(node.id())
    },
  })

  return queue
}

describe('GraphEntity', () => {
  beforeAll(() => {
    g = new GraphEntity()
    g.vertices = []
    g.edges = []

    list = new VertexEntity()
    list.id = 'list'
    list.type = NodeType.React_List

    a = new VertexEntity()
    a.id = 'a'
    a.type = NodeType.React_List_Item

    b = new VertexEntity()
    b.id = 'b'
    b.type = NodeType.React_List_Item

    c = new VertexEntity()
    c.id = 'c'
    c.type = NodeType.React_List_Item
  })

  afterEach(() => {
    resetEdgesAndVertices(g)
  })

  it('Should add vertices using addVertices function', () => {
    g.addVertices([list, a, b, c])
    expect(g.vertices).toStrictEqual([list, a, b, c])
  })

  it('Should add vertices using addVertex function', () => {
    g.addVertex(list)
    g.addVertex(a)
    g.addVertex(b)
    g.addVertex(c)
    expect(g.vertices).toStrictEqual([list, a, b, c])
  })

  it('Should not add vertex more then once', () => {
    g.addVertex(list)
    g.addVertices([list, a, b, c])
    expect(g.vertices).toStrictEqual([list, a, b, c])
  })

  it('Should have correct parent', () => {
    addThreeItemsToList(g, list, a, b, c)

    expect(g.vertices[1].parent).toEqual(g.vertices[0].id)
    expect(g.vertices[2].parent).toEqual(g.vertices[0].id)
    expect(g.vertices[3].parent).toEqual(g.vertices[0].id)
  })

  it('Should throw error if vertex source does not exist', () => {
    expect(() => g.addEdge(list.id, a.id)).toThrowError(
      `Vertex with source id ${list.id} does not exist`,
    )
  })

  it('Should throw error if vertex target does not exist', () => {
    g.addVertex(list)
    expect(() => g.addEdge(list.id, a.id)).toThrowError(
      `Vertex with target id: ${a.id} was not found`,
    )
  })

  it('Should make cytoscape object', () => {
    addThreeItemsToList(g, list, a, b, c)

    const { cy } = g
    const nodes: NodeCollection = cy.nodes()
    const edges: EdgeCollection = cy.edges()

    expect(nodes.nonempty()).toBeTruthy()
    expect(edges.nonempty()).toBeTruthy()

    expect(nodes.getElementById(list.id)).toBeDefined()
    expect(nodes.getElementById(a.id)).toBeDefined()
    expect(nodes.getElementById(b.id)).toBeDefined()
    expect(nodes.getElementById(c.id)).toBeDefined()

    expect(nodes.getElementById(list.id).isParent()).toBeTruthy()
    expect(nodes.getElementById(a.id).isChild()).toBeTruthy()
    expect(nodes.getElementById(b.id).isChild()).toBeTruthy()
    expect(nodes.getElementById(c.id).isChild()).toBeTruthy()
  })

  it('Can traverse graph using BFS', () => {
    addThreeItemsToList(g, list, a, b, c)

    const { cy } = g
    const queue = getBfsQueue(cy)

    expect(queue).toMatchObject([list.id, a.id, b.id, c.id])
  })

  it('should move with different parent', () => {
    const vertices = createAtoEVertices()

    g.addVertices([
      vertices.root,
      vertices.a,
      vertices.b,
      vertices.c,
      vertices.d,
      vertices.e,
    ])
    g.addEdge(vertices.root.id, vertices.a.id)
    g.addEdge(vertices.root.id, vertices.d.id)
    g.addEdge(vertices.a.id, vertices.b.id)
    g.addEdge(vertices.a.id, vertices.c.id)
    g.addEdge(vertices.d.id, vertices.e.id)

    g.moveVertex(vertices.c.id, vertices.e.id)
    // console.log(JSON.stringify(g.d3, null, 2))

    const { cy } = g
    const queue: Array<string> = getBfsQueue(cy)

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
    expect(queue).toMatchObject([
      vertices.root.id,
      vertices.a.id,
      vertices.d.id,
      vertices.b.id,
      vertices.c.id,
      vertices.e.id,
    ])
  })

  it('should move with different parent with correct order', () => {
    const vertices: any = createAtoEVertices()
    const f = new VertexEntity()

    f.id = 'f'
    f.type = NodeType.React_List_Item
    vertices.f = f

    g.addVertices([
      vertices.root,
      vertices.a,
      vertices.b,
      vertices.c,
      vertices.d,
      vertices.e,
      vertices.f,
    ])
    g.addEdge(vertices.root.id, vertices.a.id)
    g.addEdge(vertices.root.id, vertices.d.id)
    g.addEdge(vertices.a.id, vertices.b.id)
    g.addEdge(vertices.a.id, vertices.c.id)
    g.addEdge(vertices.d.id, vertices.e.id)
    g.addEdge(vertices.d.id, vertices.f.id)

    g.moveVertex(vertices.f.id, vertices.b.id)
    console.log(JSON.stringify(g.d3, null, 2))

    const { cy } = g
    const queue: Array<string> = getBfsQueue(cy)

    expect(queue).toMatchObject([
      vertices.root.id,
      vertices.a.id,
      vertices.d.id,
      vertices.b.id,
      vertices.f.id,
      vertices.c.id,
      vertices.e.id,
    ])
  })

  it('should move item to the end of list with same parent', () => {
    const vertices = createAtoEVertices()

    g.addVertices([
      vertices.root,
      vertices.a,
      vertices.b,
      vertices.c,
      vertices.d,
      vertices.e,
    ])
    g.addEdge(vertices.root.id, vertices.a.id)
    g.addEdge(vertices.root.id, vertices.b.id)
    g.addEdge(vertices.root.id, vertices.c.id)
    g.addEdge(vertices.root.id, vertices.d.id)
    g.addEdge(vertices.root.id, vertices.e.id)

    g.moveVertex(vertices.a.id, vertices.e.id)

    const { cy } = g
    const queue: Array<string> = getBfsQueue(cy)

    expect(queue).toMatchObject([
      vertices.root.id,
      vertices.b.id,
      vertices.c.id,
      vertices.d.id,
      vertices.e.id,
      vertices.a.id,
    ])
  })

  it('should move vertices with same parent', () => {
    const d = new VertexEntity()

    d.id = 'd'
    d.type = NodeType.React_List_Item

    const e = new VertexEntity()

    e.id = 'e'
    e.type = NodeType.React_List_Item
    g.addVertices([list, a, b, c, d, e])
    g.addEdge(list.id, a.id)
    g.addEdge(list.id, b.id)
    g.addEdge(list.id, c.id)
    g.addEdge(list.id, d.id)
    g.addEdge(list.id, e.id)

    g.moveVertex(d.id, a.id)

    const { cy } = g
    const queue: Array<string> = getBfsQueue(cy)

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
    expect(queue).toMatchObject([list.id, a.id, d.id, b.id, c.id, e.id])
  })

  it('Should move vertices', () => {
    addThreeItemsToList(g, list, a, b, c)

    g.moveVertex(c.id, a.id)

    const { cy } = g
    const queue: Array<string> = getBfsQueue(cy)

    expect(queue).toMatchObject([list.id, a.id, c.id, b.id])
  })
})
