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
import { IGraph } from '../../graphql/models/IGraph'
import { TypeOrmEdge } from './TypeOrmEdge'
import { TypeOrmUser } from './TypeOrmUser'
import { TypeOrmVertex } from './TypeOrmVertex'

@Entity('graph')
@ObjectType({
  implements: [IGraph],
})
export class TypeOrmGraph {
  @PrimaryGeneratedColumn('uuid')
  declare id: string

  @Column({ type: 'text', nullable: true })
  declare label?: string

  @OneToMany((type) => TypeOrmVertex, (vertex) => vertex.graph)
  declare vertices: Array<TypeOrmVertex>

  @OneToMany((type) => TypeOrmEdge, (edge) => edge.graph)
  declare edges: Array<TypeOrmEdge>

  @ManyToOne((type) => TypeOrmUser, (user) => user.graphs)
  declare user: TypeOrmUser

  @AfterLoad()
  setVertexParent() {
    this.edges.forEach((edge: TypeOrmEdge) => {
      const v: TypeOrmVertex | undefined = this.vertices.find(
        (vertex: TypeOrmVertex) => {
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

  addVertex(v: TypeOrmVertex): void {
    if (!this.hasVertex(v.id)) {
      this.vertices.push(v)
    }
  }

  addVertices(vertices: Array<TypeOrmVertex>): void {
    vertices.forEach((v: TypeOrmVertex) => {
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
      const target: TypeOrmVertex | undefined = this.vertices.find(
        (v: TypeOrmVertex) => {
          return v.id === targetId
        },
      )

      if (target) {
        target.parent = sourceId
        const edge: TypeOrmEdge = new TypeOrmEdge()

        edge.id = uuidv4()
        edge.source = sourceId
        edge.target = targetId

        this.edges.push(edge)
      } else {
        throw new Error(`Vertex with target id: ${targetId} was not found`)
      }
    }
  }

  addEdge(source: TypeOrmVertex, target: TypeOrmVertex): void {
    if (!this.hasVertex(source.id)) {
      throw new Error(`Vertex with source id ${source.id} does not exist`)
    }

    if (!this.hasVertex(target.id)) {
      throw new Error(`Vertex with target id ${target.id} does not exist`)
    }

    if (!this.hasEdge(source.id, target.id)) {
      // eslint-disable-next-line no-param-reassign
      target.parent = source.id
      const edge: TypeOrmEdge = new TypeOrmEdge()

      edge.id = uuidv4()
      edge.source = source.id
      edge.target = target.id

      this.edges.push(edge)
      this.edges.forEach((e: TypeOrmEdge, index) => {
        e.order = index
      })
    }
  }

  hasVertex(vertexId: string): boolean {
    const index = this.vertices.findIndex((v: TypeOrmVertex) => {
      return v.id === vertexId
    })

    return index !== -1
  }

  hasEdge(sourceId: string, targetId: string): boolean {
    const index = this.edges.findIndex((e: TypeOrmEdge) => {
      return e.source === sourceId && e.target === targetId
    })

    return index !== -1
  }

  public makeCytoscape(graph: TypeOrmGraph): cytoscape.Core {
    return cytoscape({
      headless: true,
      elements: {
        nodes: this.cyMapVertices(graph.vertices),
        edges: this.cyMapEdges(graph.edges),
      },
    })
  }

  private cyMapEdges(edges: Array<TypeOrmEdge>): Array<EdgeDefinition> {
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
    vertices: Array<Partial<TypeOrmVertex>>,
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
