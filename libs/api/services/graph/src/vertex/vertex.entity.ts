import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { GraphEntity } from '../graph/graph.entity'
import { IVertex } from './IVertex'

@Entity('vertex')
@ObjectType({
  implements: [IVertex],
})
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

  declare graphId: number

  @ManyToOne('GraphEntity', 'vertices')
  @JoinColumn({ name: 'graphId', referencedColumnName: 'id' })
  declare graph: GraphEntity
}
