import { Injectable } from '@nestjs/common'
import { ObjectType, registerEnumType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IVertex } from '../../graphql/models/IVertex'
import { TypeOrmGraph } from './TypeOrmGraph'
import { NodeType } from '@codelab/shared/interface/node'

registerEnumType(NodeType, {
  name: 'NodeType',
})

@Entity('vertex')
@ObjectType({
  implements: [IVertex],
})
@Injectable()
export class TypeOrmVertex {
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

  @ManyToOne((type) => TypeOrmGraph, (graph) => graph.vertices)
  declare graph: TypeOrmGraph
}
