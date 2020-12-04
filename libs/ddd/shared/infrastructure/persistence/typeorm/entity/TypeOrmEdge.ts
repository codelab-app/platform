import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IEdge } from '../../graphql/models/IEdge'
import { TypeOrmGraph } from './TypeOrmGraph'

@Entity('edge')
@ObjectType({
  implements: [IEdge],
})
export class TypeOrmEdge {
  @PrimaryGeneratedColumn('uuid')
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
    type: 'int',
  })
  declare order: number

  @Column({
    type: 'jsonb',
  })
  declare props?: any

  @ManyToOne((type) => TypeOrmGraph, (graph) => graph.edges)
  declare graph: TypeOrmGraph
}
