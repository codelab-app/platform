import { ObjectType } from '@nestjs/graphql'
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  declare userId: number

  // @ManyToOne((type) => VertexEntity, (vertex) => vertex.graphs)
  // @JoinColumn({ name: 'vertexId', referencedColumnName: 'id' })
  // declare vertex: VertexEntity
  //
  // @ManyToOne((type) => EdgeEntity, (edge) => edge.graphs)
  // @JoinColumn({ name: 'edgeId', referencedColumnName: 'id' })
  // declare edge: EdgeEntity

  @OneToMany('VertexEntity', 'graph')
  declare vertices: Array<VertexEntity>

  @OneToMany('EdgeEntity', 'graph')
  declare edges: Array<EdgeEntity>

  @ManyToOne('UserEntity', 'graphs')
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  declare user: UserEntity
}
