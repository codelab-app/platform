import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
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

  @OneToMany((type) => GraphEntity, (graph) => graph.vertex)
  declare graphs: Array<GraphEntity>
}
