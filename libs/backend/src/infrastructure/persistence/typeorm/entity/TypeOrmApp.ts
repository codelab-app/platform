import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { EntityConfig } from '../../config/EntityConfig'
import { BaseTypeOrm } from './BaseTypeOrm'
import { TypeOrmGraph, TypeOrmPage, TypeOrmUser } from '@codelab/backend'

@Entity(EntityConfig.APP_ENTITY)
export class TypeOrmApp extends BaseTypeOrm {
  @Column({ type: 'text' })
  declare title: string

  @ManyToOne((type) => TypeOrmUser, (user) => user.apps)
  declare user: TypeOrmUser

  @OneToMany((type) => TypeOrmPage, (page) => page.app, { eager: true })
  declare pages: Array<TypeOrmPage>

  @OneToMany((type) => TypeOrmGraph, (graph) => graph.app, { eager: true })
  declare graphs: Array<TypeOrmGraph>
}
