import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IVertex } from './IVertex'

@Entity('vertex')
@ObjectType({
  implements: [IVertex],
})
export class VertexEntity {
  @PrimaryGeneratedColumn()
  declare id: number

  @Column({
    type: 'jsonb',
  })
  declare props?: any
}
