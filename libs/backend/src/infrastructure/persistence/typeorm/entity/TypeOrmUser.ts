import { Column, Entity, OneToMany } from 'typeorm'
import { EntityConfig } from '../../config/EntityConfig'
import { BaseTypeOrm } from './BaseTypeOrm'
import { TypeOrmApp } from './TypeOrmApp'

@Entity(EntityConfig.USER_ENTITY)
export class TypeOrmUser extends BaseTypeOrm {
  @Column({
    type: 'text',
    unique: true,
  })
  declare email: string

  @Column({
    type: 'text',
    select: false,
    nullable: true,
  })
  declare password: string

  // @Column({
  //   type: 'text',
  //   nullable: true,
  // })
  // @IsOptional()
  // declare googleProviderId: string

  @OneToMany((type) => TypeOrmApp, (app) => app.user, { eager: true })
  declare apps: Array<TypeOrmApp>
}
