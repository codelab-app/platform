import { ObjectType } from '@nestjs/graphql'
import { plainToClass } from 'class-transformer'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IEdge } from '../../../graphql/models/IEdge'
import { Edge } from '@codelab/modules/edge'

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
  order = 0

  @Column({
    type: 'jsonb',
  })
  declare props?: any

  toDomain(): Edge {
    return plainToClass(Edge, this)
  }

  // @ManyToOne((type) => TypeOrmGraph, (graph) => graph.edges)
  // declare graph: TypeOrmGraph
}
