import { Injectable } from '@nestjs/common'
import { ObjectType, registerEnumType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { IVertex } from '../../../graphql/models/IVertex'
import { EntityConfig } from '../../config/EntityConfig'
import { BaseTypeOrm } from './BaseTypeOrm'
import { TypeOrmGraph } from './TypeOrmGraph'
import { NodeType } from '@codelab/alpha/shared/interface/node'

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

  @Column()
  declare graph_id: number

  parent?: string

  @Column({
    type: 'jsonb',
  })
  declare props?: object

  @ManyToOne((type) => TypeOrmGraph, (graph) => graph.vertices)
  declare graph: TypeOrmGraph
}
