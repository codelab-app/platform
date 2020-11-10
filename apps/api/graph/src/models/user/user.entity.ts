import * as crypto from 'crypto'
import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { GraphEntity } from '../graph/graph.entity'
import { IUser } from './IUser'

@Entity('user')
@ObjectType({
  implements: [IUser],
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  declare id: string

  @Column({
    type: 'text',
  })
  declare username: string

  @Column({
    type: 'text',
    select: false,
    name: 'password',
  })
  private declare passwordHash: string

  set password(password: string) {
    this.passwordHash = crypto.createHmac('sha256', password).digest('hex')
  }

  @OneToMany((type) => GraphEntity, (graph) => graph.user)
  declare graphs: Array<GraphEntity>
}
