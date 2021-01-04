import { Injectable } from '@nestjs/common'
import { Core } from 'cytoscape'
import { VertexEntity } from '../vertex/vertex.entity'
import { GraphEntity } from './graph.entity'
import {
  createAtoEVertices,
  createAtoFVertices,
  createAtoIVertices,
} from './sample.data'
import { NodeType } from '@codelab/alpha/shared/interface/node'

@Injectable()
export class CytoscapeStorybookService {
  g: GraphEntity

  constructor() {
    this.g = new GraphEntity()
    this.resetGraph()
  }

  resetGraph() {
    this.g.vertices = []
    this.g.edges = []
  }

  // should move with different parent with correct order
  shouldMoveWithDiffParentCorrectOrder(
    move = false,
    srcTarget?: { source?: string; target?: string },
  ) {
    this.resetGraph()
    const vertices: any = createAtoFVertices()

    this.g.addVertices([
      vertices.root,
      vertices.a,
      vertices.b,
      vertices.c,
      vertices.d,
      vertices.e,
      vertices.f,
    ])
    this.g.addEdge(vertices.root.id, vertices.a.id)
    this.g.addEdge(vertices.root.id, vertices.d.id)
    this.g.addEdge(vertices.a.id, vertices.b.id)
    this.g.addEdge(vertices.a.id, vertices.c.id)
    this.g.addEdge(vertices.d.id, vertices.e.id)
    this.g.addEdge(vertices.d.id, vertices.f.id)
    if (move && srcTarget) {
      const source = srcTarget.source as string
      const target = srcTarget.target as string

      this.g.moveVertex(source, target)
    }

    return this.getCyNodesEdges(this.g.cy)
  }

  simpleGraph() {
    this.resetGraph()
    const list = new VertexEntity()

    list.id = 'list'
    list.type = NodeType.React_List

    const a = new VertexEntity()

    a.id = 'a'
    a.type = NodeType.React_List_Item

    const b = new VertexEntity()

    b.id = 'b'
    b.type = NodeType.React_List_Item

    const c = new VertexEntity()

    c.id = 'c'
    c.type = NodeType.React_List_Item

    this.g.addVertices([list, a, b, c])
    this.g.addEdge(list.id, a.id)
    this.g.addEdge(list.id, b.id)
    this.g.addEdge(list.id, c.id)

    const { cy } = this.g

    return this.getCyNodesEdges(cy)
  }

  shouldMoveWithDifferentParent(
    move = false,
    srcTarget?: { source?: string; target?: string },
  ) {
    this.resetGraph()
    const vertices = createAtoEVertices()

    this.g.addVertices([
      vertices.root,
      vertices.a,
      vertices.b,
      vertices.c,
      vertices.d,
      vertices.e,
    ])
    this.g.addEdge(vertices.root.id, vertices.a.id)
    this.g.addEdge(vertices.root.id, vertices.d.id)
    this.g.addEdge(vertices.a.id, vertices.b.id)
    this.g.addEdge(vertices.a.id, vertices.c.id)
    this.g.addEdge(vertices.d.id, vertices.e.id)

    if (move && srcTarget) {
      const source = srcTarget.source as string
      const target = srcTarget.target as string

      this.g.moveVertex(source, target)
    }

    const { cy } = this.g

    return this.getCyNodesEdges(cy)
  }

  shouldMoveItemToEndOfListSameParent(
    move = false,
    srcTarget?: { source?: string; target?: string },
  ) {
    this.resetGraph()
    const vertices = createAtoEVertices()

    this.g.addVertices([
      vertices.root,
      vertices.a,
      vertices.b,
      vertices.c,
      vertices.d,
      vertices.e,
    ])
    this.g.addEdge(vertices.root.id, vertices.a.id)
    this.g.addEdge(vertices.root.id, vertices.b.id)
    this.g.addEdge(vertices.root.id, vertices.c.id)
    this.g.addEdge(vertices.root.id, vertices.d.id)
    this.g.addEdge(vertices.root.id, vertices.e.id)

    if (move && srcTarget) {
      const source = srcTarget.source as string
      const target = srcTarget.target as string

      this.g.moveVertex(source, target)
    }

    const { cy } = this.g

    return this.getCyNodesEdges(cy)
  }

  shouldMoveItemToEndOfListDifferentParent(
    move = false,
    srcTarget?: { source?: string; target?: string },
  ) {
    this.resetGraph()
    const vertices = createAtoIVertices()

    this.g.addVertices([
      vertices.root,
      vertices.a,
      vertices.b,
      vertices.c,
      vertices.d,
      vertices.e,
      vertices.f,
      vertices.g,
      vertices.h,
      vertices.i,
    ])
    this.g.addEdge(vertices.root.id, vertices.a.id)
    this.g.addEdge(vertices.root.id, vertices.b.id)

    this.g.addEdge(vertices.a.id, vertices.c.id)
    this.g.addEdge(vertices.a.id, vertices.d.id)
    this.g.addEdge(vertices.a.id, vertices.e.id)
    this.g.addEdge(vertices.a.id, vertices.f.id)

    this.g.addEdge(vertices.b.id, vertices.g.id)
    this.g.addEdge(vertices.b.id, vertices.h.id)
    this.g.addEdge(vertices.b.id, vertices.i.id)

    if (move && srcTarget) {
      const source = srcTarget.source as string
      const target = srcTarget.target as string

      this.g.moveVertex(source, target)
    }

    const { cy } = this.g

    return this.getCyNodesEdges(cy)
  }

  shouldMoveWithDifferentParentWithTwoChildren(
    move = false,
    srcTarget?: { source?: string; target?: string },
  ) {
    this.resetGraph()

    const vertices = createAtoFVertices()

    this.g.addVertices([
      vertices.root,
      vertices.a,
      vertices.b,
      vertices.c,
      vertices.d,
      vertices.e,
      vertices.f,
    ])

    this.g.addEdge(vertices.root.id, vertices.a.id)
    this.g.addEdge(vertices.root.id, vertices.b.id)

    this.g.addEdge(vertices.a.id, vertices.c.id)
    this.g.addEdge(vertices.a.id, vertices.d.id)

    this.g.addEdge(vertices.b.id, vertices.e.id)
    this.g.addEdge(vertices.b.id, vertices.f.id)

    if (move && srcTarget) {
      const source = srcTarget.source as string
      const target = srcTarget.target as string

      this.g.moveVertex(source, target)
    }

    const { cy } = this.g

    return this.getCyNodesEdges(cy)
  }

  // Returns nodes and edges to display cytoscape graph in browser
  private getCyNodesEdges(cy: Core) {
    const json = cy.json() as any
    const { elements } = json
    const nodes = elements.nodes.map((n: any) => {
      return {
        data: { id: n.data.id },
      }
    })
    const edges = elements.edges.map((e: any) => {
      return {
        data: {
          id: e.data.id,
          source: e.data.source,
          target: e.data.target,
        },
      }
    })

    return { nodes, edges }
  }
}
