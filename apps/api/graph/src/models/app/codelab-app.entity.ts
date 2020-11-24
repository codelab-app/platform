import { ObjectType } from '@nestjs/graphql'
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { GraphEntity } from '../graph/graph.entity'
import { PageEntity } from '../page/page.entity'
import { UserEntity } from '../user/user.entity'
import { IApp } from './IApp'

@Entity('apps')
@ObjectType({
  implements: [IApp],
})
export class CodelabAppEntity {
  @PrimaryGeneratedColumn('uuid')
  declare id: string

  @ManyToOne((type) => UserEntity, (user) => user.apps)
  declare user: UserEntity

  @OneToMany((type) => PageEntity, (page) => page.app)
  declare pages: Array<PageEntity>

  @OneToMany((type) => GraphEntity, (graph) => graph.app)
  declare graphs: Array<GraphEntity>
}
