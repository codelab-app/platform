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
import { IGraph } from '../../../http/graphql/models/IGraph'
import { EdgeEntity } from './Edge'
import { UserEntity } from './User'
import { VertexEntity } from './Vertex'

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

  @ManyToOne((type) => UserEntity, (user) => user.graphs)
  declare user: UserEntity

  @AfterLoad()
  setVertexParent() {
    this.edges.forEach((edge: EdgeEntity) => {
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
    this.edges.sort((a, b) => {
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

  addEdgeById(sourceId: string, targetId: string): void {
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
      } else {
        throw new Error(`Vertex with target id: ${targetId} was not found`)
      }
    }
  }

  addEdge(source: VertexEntity, target: VertexEntity): void {
    if (!this.hasVertex(source.id)) {
      throw new Error(`Vertex with source id ${source.id} does not exist`)
    }

    if (!this.hasVertex(target.id)) {
      throw new Error(`Vertex with target id ${target.id} does not exist`)
    }

    if (!this.hasEdge(source.id, target.id)) {
      // eslint-disable-next-line no-param-reassign
      target.parent = source.id
      const edge: EdgeEntity = new EdgeEntity()

      edge.id = uuidv4()
      edge.source = source.id
      edge.target = target.id

      this.edges.push(edge)
      this.edges.forEach((e: EdgeEntity, index) => {
        e.order = index
      })
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

  public makeCytoscape(graph: GraphEntity): cytoscape.Core {
    return cytoscape({
      headless: true,
      elements: {
        nodes: this.cyMapVertices(graph.vertices),
        edges: this.cyMapEdges(graph.edges),
      },
    })
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
