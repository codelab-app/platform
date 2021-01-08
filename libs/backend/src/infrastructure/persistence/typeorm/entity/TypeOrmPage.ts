import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { IPage } from '../../../graphql/models/IPage'
import { EntityConfig } from '../../config/EntityConfig'
import { BaseTypeOrm } from './BaseTypeOrm'
import { TypeOrmApp } from './TypeOrmApp'
import { TypeOrmGraph } from './TypeOrmGraph'

@Entity(EntityConfig.PAGE_ENTITY)
@ObjectType({
  implements: [IPage],
})
export class TypeOrmPage extends BaseTypeOrm {
  @Column({
    type: 'text',
    unique: true,
  })
  declare title: string

  @ManyToOne((type) => TypeOrmApp, (app) => app.pages)
  declare app: TypeOrmApp

  @OneToMany((type) => TypeOrmGraph, (graph) => graph.page)
  declare graphs: Array<TypeOrmGraph>
}
