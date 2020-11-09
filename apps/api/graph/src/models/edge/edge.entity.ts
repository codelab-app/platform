import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { GraphEntity } from '../graph'
import { IEdge } from './IEdge'

@Entity('edge')
@ObjectType({
  implements: [IEdge],
})
export class EdgeEntity {
  @PrimaryColumn()
  declare id: string

  @Column({
    type: 'text',
  })
  declare source: string

  @Column({
    type: 'text',
  })
  declare target: string

  @Column({
    type: 'jsonb',
  })
  declare props?: any

  @ManyToOne('GraphEntity', 'edges')
  declare graph: GraphEntity
}
