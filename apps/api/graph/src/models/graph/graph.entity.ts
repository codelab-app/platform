import { ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { EdgeEntity } from '../edge/edge.entity'
import { UserEntity } from '../user/user.entity'
import { VertexEntity } from '../vertex/vertex.entity'
import { IGraph } from './IGraph'

@Entity('graph')
@ObjectType({
  implements: [IGraph],
})
export class GraphEntity {
  @PrimaryGeneratedColumn()
  declare id: number

  @Column({ type: 'text', nullable: false })
  declare label: string

  @OneToMany((type) => VertexEntity, (vertex) => vertex.graph)
  declare vertices: Array<VertexEntity>

  @OneToMany((type) => EdgeEntity, (edge) => edge.graph)
  declare edges: Array<EdgeEntity>

  @ManyToOne((type) => UserEntity, (user) => user.graphs)
  declare user: UserEntity
}
