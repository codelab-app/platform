import { ObjectType } from '@nestjs/graphql'
import { Column, Entity } from 'typeorm'
import { IUser } from '../../../graphql/models/IUser'
import { EntityConfig } from '../../config/EntityConfig'
import { BaseTypeOrm } from './BaseTypeOrm'

@Entity(EntityConfig.USER_ENTITY)
@ObjectType({
  implements: [IUser],
})
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

  /**
   * Won't trigger if we use `repository.save()`
   */
  // @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10)
  // }

  // @OneToMany((type) => TypeOrmGraph, (graph) => graph.user)
  // @IsOptional()
  // declare graphs: Array<TypeOrmGraph>
}
