import { Injectable } from '@nestjs/common'
import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { GraphEntity } from '../graph/graph.entity'
import { IVertex, VertexType } from './vertex.interface'

@Entity('vertex')
@ObjectType({
  implements: [IVertex],
})
@Injectable()
export class VertexEntity {
  @PrimaryColumn()
  declare id: string

  @Column({
    type: 'enum',
    enum: VertexType,
    // default: VertexType.GHOST
  })
  declare type: VertexType

  @Column({
    type: 'jsonb',
  })
  declare props?: any

  @ManyToOne((type) => GraphEntity, (graph) => graph.vertices)
  declare graph: GraphEntity
}
