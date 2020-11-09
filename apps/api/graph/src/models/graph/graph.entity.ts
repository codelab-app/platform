import { ObjectType } from '@nestjs/graphql'
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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

  @OneToMany('VertexEntity', 'graph')
  declare vertices: Array<VertexEntity>

  @OneToMany('EdgeEntity', 'graph')
  declare edges: Array<EdgeEntity>

  @ManyToOne('UserEntity', 'graphs')
  declare user: UserEntity
}
