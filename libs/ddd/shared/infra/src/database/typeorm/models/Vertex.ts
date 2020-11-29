import { Injectable } from '@nestjs/common'
import { ObjectType, registerEnumType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IVertex } from '../../../http/graphql/models/IVertex'
import { GraphEntity } from './Graph'
import { NodeType } from '@codelab/shared/interface/node'

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

  parent?: string

  @Column({
    type: 'jsonb',
  })
  declare props?: object

  @ManyToOne((type) => GraphEntity, (graph) => graph.vertices)
  declare graph: GraphEntity
}
