import { ObjectType } from '@nestjs/graphql'
import { Column, Entity } from 'typeorm'
import { IPage } from '../../../graphql/models/IPage'
import { EntityConfig } from '../../config/EntityConfig'
import { BaseTypeOrm } from './BaseTypeOrm'

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
}
