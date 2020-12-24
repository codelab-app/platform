import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { IEdge } from '../../../graphql/models/IEdge'
import { EntityConfig } from '../../config/EntityConfig'
import { BaseTypeOrm } from './BaseTypeOrm'
import { TypeOrmGraph } from './TypeOrmGraph'

@Entity(EntityConfig.EDGE_ENTITY)
@ObjectType({
  implements: [IEdge],
})
export class TypeOrmEdge extends BaseTypeOrm {
  @Column()
  declare graph_id: number

  @Column({
    type: 'text',
  })
  declare source: string

  @Column({
    type: 'text',
  })
  declare target: string

  @Column({
    type: 'int',
  })
  order = 0

  @Column({
    type: 'jsonb',
  })
  declare props?: any

  @ManyToOne((type) => TypeOrmGraph, (graph) => graph.edges)
  declare graph: TypeOrmGraph
}
