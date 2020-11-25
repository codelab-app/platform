import { ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { GraphEntity } from '../graph/graph.entity'
import { IEdge } from './IEdge'

@Entity('edge')
@ObjectType({
  implements: [IEdge],
})
export class EdgeEntity {
  @PrimaryGeneratedColumn('uuid')
  declare id: string

  @Column({
    type: 'text',
  })
  @Index()
  declare source: string

  @Column({
    type: 'text',
  })
  @Index()
  declare target: string

  @Column({
    type: 'int',
  })
  declare order: number

  @Column({
    type: 'jsonb',
  })
  declare props?: any

  @ManyToOne((type) => GraphEntity, (graph) => graph.edges)
  declare graph: GraphEntity
}
