import { ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { EdgeEntity } from '../edge'
import { VertexEntity } from '../vertex'
import { IGraph } from './IGraph'
import { UserEntity } from '@codelab/api/services/user'

@Entity('graph')
@ObjectType({
  implements: [IGraph],
})
export class GraphEntity {
  @PrimaryGeneratedColumn()
  declare id: number

  @Column({ type: 'text' })
  declare vertexId: string

  @Column({ type: 'text' })
  declare edgeId: string

  @Column({ type: 'int' })
  declare userId: number

  @ManyToOne((type) => VertexEntity, (vertex) => vertex.graphs)
  @JoinColumn({ name: 'vertexId', referencedColumnName: 'id' })
  declare vertex: VertexEntity

  @ManyToOne((type) => EdgeEntity, (edge) => edge.graphs)
  @JoinColumn({ name: 'edgeId', referencedColumnName: 'id' })
  declare edge: EdgeEntity

  @ManyToOne((type) => UserEntity, (user) => user.graphs)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  declare user: UserEntity
}
