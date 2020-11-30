import { ObjectType } from '@nestjs/graphql'
import cytoscape, { EdgeDefinition, NodeDefinition } from 'cytoscape'
import { merge } from 'lodash'
import objectMapper from 'object-mapper'
import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { CodelabAppEntity } from '../app/codelab-app.entity'
import { EdgeEntity } from '../edge/edge.entity'
import { PageEntity } from '../page/page.entity'
import { VertexEntity } from '../vertex/vertex.entity'
import { IGraph } from './IGraph'
import { NodeType } from '@codelab/shared/interface/node'

export type VertexID = string

export interface ICyEdge {
  id: string
  source: VertexID
  target: VertexID
}

@Entity('graph')
@ObjectType({
  implements: [IGraph],
})
export class GraphEntity {
  @PrimaryGeneratedColumn('uuid')
  declare id: string

  @Column({ type: 'text', nullable: true })
  declare label?: string

  @OneToMany((type) => VertexEntity, (vertex) => vertex.graph)
  declare vertices: Array<VertexEntity>

  @OneToMany((type) => EdgeEntity, (edge) => edge.graph)
  declare edges: Array<EdgeEntity>

  @ManyToOne((type) => CodelabAppEntity, (app) => app.graphs)
  declare app: CodelabAppEntity

  @ManyToOne((type) => PageEntity, (page) => page.graphs)
  declare page: PageEntity

  @AfterLoad()
  setVertexParent() {
    this.edges?.forEach((edge: EdgeEntity) => {
      const v: VertexEntity | undefined = this.vertices.find(
        (vertex: VertexEntity) => {
          return vertex.id === edge.target
        },
      )

      if (v) {
        v.parent = edge.source
      }
    })
  }

  sortEdges() {
    this.edges?.sort((a, b) => {
      return a.order - b.order
    })
  }

  addVertex(v: VertexEntity): void {
    if (!this.hasVertex(v.id)) {
      this.vertices.push(v)
    }
  }

  addVertices(vertices: Array<VertexEntity>): void {
    vertices.forEach((v: VertexEntity) => {
      if (!this.hasVertex(v.id)) {
        this.vertices.push(v)
      }
    })
  }

  addEdge(sourceId: VertexID, targetId: VertexID): void {
    if (!this.hasVertex(sourceId)) {
      throw new Error(`Vertex with source id ${sourceId} does not exist`)
    }

    if (!this.hasVertex(sourceId)) {
      throw new Error(`Vertex with target id ${sourceId} does not exist`)
    }

    if (!this.hasEdge(sourceId, targetId)) {
      const target: VertexEntity | undefined = this.vertices.find(
        (v: VertexEntity) => {
          return v.id === targetId
        },
      )

      if (target) {
        target.parent = sourceId
        const edge: EdgeEntity = new EdgeEntity()

        edge.id = uuidv4()
        edge.source = sourceId
        edge.target = targetId

        this.edges.push(edge)
        this.edges.forEach((e: EdgeEntity, index) => {
          e.order = index
        })
      } else {
        throw new Error(`Vertex with target id: ${targetId} was not found`)
      }
    }
  }

  hasVertex(vertexId: string): boolean {
    const index = this.vertices.findIndex((v: VertexEntity) => {
      return v.id === vertexId
    })

    return index !== -1
  }

  hasEdge(sourceId: string, targetId: string): boolean {
    const index = this.edges.findIndex((e: EdgeEntity) => {
      return e.source === sourceId && e.target === targetId
    })

    return index !== -1
  }

  public moveVertex(sourceId: VertexID, targetId: VertexID) {
    const sourceIndexE = this.edges.findIndex((e: EdgeEntity) => {
      return e.target === sourceId
    })

    if (sourceIndexE === -1) {
      throw new Error(`Vertex with source id ${sourceId} does not exist`)
    }

    const targetIndexE = this.edges.findIndex((e: EdgeEntity) => {
      return e.target === targetId
    })

    if (targetIndexE === -1) {
      throw new Error(`Vertex with target id ${targetId} does not exist`)
    }

    this.arrayMove(this.edges, sourceIndexE, targetIndexE)
    this.edges?.forEach((edge: EdgeEntity, index) => {
      edge.order = index
    })
  }

  moveUsingCytoscape(
    cy: cytoscape.Core,
    source: VertexID,
    target: VertexID,
  ): cytoscape.Core {
    const cyJson = cy.json() as any
    const cyEdges = cyJson.elements.edges.map((e: any) => e.data)

    const sourceEdge = cyEdges.find((edge: ICyEdge) => {
      return edge.target === source
    })

    if (!sourceEdge) {
      throw new Error(`Source edge with id ${source} was not found`)
    }

    const targetEdgeIndex = cyEdges.findIndex((edge: ICyEdge) => {
      return edge.target === target
    })

    if (targetEdgeIndex === -1) {
      throw new Error(`Target edge with id: ${target} was not found`)
    }

    const targetEdge = cyEdges[targetEdgeIndex + 1]

    cy.edges()
      .$id(targetEdge.id)
      .move({ source: sourceEdge.source, target: source })
    cy.edges()
      .$id(sourceEdge.id)
      .move({ source: sourceEdge.source, target: targetEdge.target })

    // cyJson = cy.json() as any
    // const movedEdges = cyJson.elements.edges.map((e: any) => e.data)

    return cy
  }

  private arrayMove(arr: Array<any>, oldIndex: number, newIndex: number) {
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1

      while (k--) {
        arr.push(undefined)
      }
    }

    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
  }

  public makeCytoscape(graph: GraphEntity): cytoscape.Core {
    return cytoscape({
      headless: true,
      elements: {
        nodes: this.cyMapVertices(graph.vertices),
        edges: this.cyMapEdges(graph.edges),
      },
    })
  }

  public makeGraphEntity(cy: cytoscape.Core): GraphEntity {
    const json = cy.json() as any
    const g = new GraphEntity()

    g.vertices = []
    g.edges = []

    g.vertices = json?.elements?.nodes?.map((node: any) => {
      return {
        id: node.data.id,
        type: NodeType[node.data.type as keyof typeof NodeType],
      } as VertexEntity
    })

    g.edges = json?.elements?.edges?.map((edge: any, index: number) => {
      return {
        id: edge.data.id,
        source: edge.data.source,
        target: edge.data.target,
        order: index,
      } as EdgeEntity
    })

    return g
  }

  private cyMapEdges(edges: Array<EdgeEntity>): Array<EdgeDefinition> {
    const mapper = {
      id: 'data.id',
      source: 'data.source',
      target: 'data.target',
    }

    return edges.map((edge) => {
      return objectMapper<EdgeDefinition>(edge, mapper)
    })
  }

  private cyMapVertices(
    vertices: Array<Partial<VertexEntity>>,
  ): Array<NodeDefinition> {
    const mapper = {
      id: 'data.id',
      parent: 'data.parent',
    }

    return vertices.map((vertex) => {
      // Spread rest of vertex props
      return merge(objectMapper<NodeDefinition>(vertex, mapper), {
        data: { ...vertex },
      })
    })
  }
}
