import { Injectable } from '@nestjs/common'
import { ObjectType, registerEnumType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { GraphEntity, VertexID } from '../graph/graph.entity'
import { IVertex } from './vertex.interface'
import { NodeType } from '@codelab/alpha/shared/interface/node'

registerEnumType(NodeType, {
  name: 'NodeType',
})

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
    // enum: VertexType,
    enum: NodeType,
    // default: VertexType.GHOST
  })
  declare type: NodeType

  parent?: VertexID

  @Column({
    type: 'jsonb',
  })
  declare props?: object

  @ManyToOne((type) => GraphEntity, (graph) => graph.vertices)
  declare graph: GraphEntity
}
