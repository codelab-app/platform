import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { GraphEntity } from '../graph/graph.entity'
import { IUser } from './IUser'

@Entity('user')
@ObjectType({
  implements: [IUser],
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  declare id: number

  @Column({
    type: 'text',
  })
  declare username: string

  @OneToMany((type) => GraphEntity, (graph) => graph.user)
  declare graphs: Array<GraphEntity>
}
