import { Injectable } from '@nestjs/common'
import { ObjectType, registerEnumType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { NodeType } from '../../../../common/types/NodeTypes'
import { IVertex } from '../../../graphql/models/IVertex'
import { EntityConfig } from '../../config/EntityConfig'
import { BaseTypeOrm } from './BaseTypeOrm'
import { TypeOrmGraph } from './TypeOrmGraph'

registerEnumType(NodeType, {
  name: 'NodeType',
})
@Entity(EntityConfig.VERTEX_ENTITY)
@ObjectType({
  implements: [IVertex],
})
@Injectable()
export class TypeOrmVertex extends BaseTypeOrm {
  @Column({
    type: 'enum',
    enum: NodeType,
  })
  declare type: NodeType

  // We need this to be returned when we delete a node
  @Column()
  declare graphId: number

  parent?: string

  @Column({
    type: 'jsonb',
  })
  declare props?: object

  @ManyToOne((type) => TypeOrmGraph, (graph) => graph.vertices)
  declare graph: TypeOrmGraph
}
