import { ObjectType } from '@nestjs/graphql'
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CodelabAppEntity } from '../app/codelab-app.entity'
import { GraphEntity } from '../graph/graph.entity'
import { IPage } from './IPage'

@Entity('page')
@ObjectType({
  implements: [IPage],
})
export class PageEntity {
  @PrimaryGeneratedColumn('uuid')
  declare id: string

  @ManyToOne((type) => CodelabAppEntity, (app) => app.pages)
  declare app: CodelabAppEntity

  @OneToMany((type) => GraphEntity, (graph) => graph.page)
  declare graphs: Array<GraphEntity>
}
