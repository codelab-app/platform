import { Injectable } from '@nestjs/common'
import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { GraphEntity } from '../graph/graph.entity'
import { IVertex } from './vertex.interface'
import { VertexType } from '@codelab/shared/interface/graph'

@Entity('vertex')
@ObjectType({
  implements: [IVertex],
})
@Injectable()
export class VertexEntity {
  @PrimaryGeneratedColumn('uuid')
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
  declare props?: object

  @ManyToOne((type) => GraphEntity, (graph) => graph.vertices)
  declare graph: GraphEntity
}
