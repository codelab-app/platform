import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IVertex, VertexType } from './vertex.interface'

@Entity('vertex')
@ObjectType({
  implements: [IVertex],
})
export class VertexEntity {
  @PrimaryGeneratedColumn()
  declare id?: string

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
}
