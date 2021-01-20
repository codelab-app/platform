import { Column, Entity, ManyToOne } from 'typeorm'
import { NodeType } from '../../../../common/types/NodeTypes'
import { EntityConfig } from '../../config/EntityConfig'
import { BaseTypeOrm } from './BaseTypeOrm'
import { TypeOrmGraph } from './TypeOrmGraph'

@Entity(EntityConfig.VERTEX_ENTITY)
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

  @ManyToOne((type) => TypeOrmGraph, (graph) => graph.vertices, {
    onDelete: 'CASCADE',
  })
  declare graph: TypeOrmGraph
}
