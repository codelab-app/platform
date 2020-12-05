import { ObjectType } from '@nestjs/graphql'
import arrayMove from 'array-move'
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
import { D3GraphProps } from '@codelab/ui/d3'

export type VertexID = string

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

  moveVertex(source: VertexID, target: VertexID) {
    const vertexSource = this.vertices?.find(
      (v: VertexEntity) => v.id === source,
    )
    const vertexTarget = this.vertices?.find(
      (v: VertexEntity) => v.id === target,
    )

    if (!vertexSource) {
      throw new Error(`Vertex source with id: ${source} was not found`)
    }

    if (!vertexTarget) {
      throw new Error(`Vertex target with id: ${target} was not found`)
    }

    // Check for same parent
    if (vertexSource.parent === vertexTarget.parent) {
      this.moveWithSameParent(source, target)
    } else {
      this.moveWithDifferentParent(vertexSource, vertexTarget, source, target)
    }
  }

  private moveWithDifferentParent(
    vertexSource: VertexEntity,
    vertexTarget: VertexEntity,
    source: VertexID,
    target: VertexID,
  ) {
    const sourceEdgeIndex = this.getEdgeIndexBySourceAndTarget(
      vertexSource.parent,
      source,
    )
    const targetEdgeIndex = this.getEdgeIndexBySourceAndTarget(
      vertexTarget.parent,
      target,
    )

    if (sourceEdgeIndex !== -1 && targetEdgeIndex !== -1) {
      const sourceEdge = this.edges[sourceEdgeIndex]
      const targetEdge = this.edges[targetEdgeIndex]
      const children = this.cy.$id(vertexTarget.parent as string).children()

      sourceEdge.source = targetEdge.source
      if (children.size() > 1) {
        this.moveEdgeAndUpdateOrder(sourceEdgeIndex, targetEdgeIndex + 1)
      }
    }
  }

  private getEdgeIndexBySourceAndTarget(
    source: VertexID | undefined,
    target: VertexID,
  ): number {
    if (source) {
      return this.edges.findIndex((e: EdgeEntity) => {
        return e.source === source && e.target === target
      })
    }

    return -1
  }

  private getEdgeIndexByTarget(target: VertexID) {
    return this.edges.findIndex((e: EdgeEntity) => {
      return e.target === target
    })
  }

  private moveWithSameParent(source: VertexID, target: VertexID) {
    const targetEdgeIndex = this.getEdgeIndexByTarget(target)
    const sourceEdgeIndex = this.getEdgeIndexByTarget(source)

    this.moveEdgeAndUpdateOrder(sourceEdgeIndex, targetEdgeIndex + 1)
  }

  private moveEdgeAndUpdateOrder(sourceIndex: number, targetIndex: number) {
    this.edges = arrayMove(this.edges, sourceIndex, targetIndex)
    this.edges = this.edges.map((e: EdgeEntity, index: number) => {
      e.order = index

      return e
    })
  }

  get cy(): cytoscape.Core {
    return cytoscape({
      headless: true,
      elements: {
        nodes: this.cyMapVertices(this.vertices),
        edges: this.cyMapEdges(this.edges),
      },
    })
  }

  get d3(): D3GraphProps {
    return {
      nodes: this.vertices.map((v: VertexEntity) => {
        return { id: v.id }
      }),
      links: this.edges.map((e: EdgeEntity) => {
        return { id: e.id, source: e.source, target: e.target }
      }),
    }
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
