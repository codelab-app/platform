import { ObjectType } from '@nestjs/graphql'
import * as bcrypt from 'bcrypt'
import {
  IsEmail,
  IsOptional,
  MinLength,
  ValidationError,
  validate,
} from 'class-validator'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IUser } from '../../graphql/models/IUser'
import { TypeOrmGraph } from './TypeOrmGraph'
import { CodelabValidationError } from 'apps/api/graph/src/app/filters/CodelabValidationError'

@Entity('user')
@ObjectType({
  implements: [IUser],
})
export class TypeOrmUser {
  @PrimaryGeneratedColumn('uuid')
  declare id: string

  @Column({
    type: 'text',
    unique: true,
  })
  @IsEmail({ allow_display_name: false }, { message: 'Invalid email' })
  declare email: string

  @Column({
    type: 'text',
    select: false,
    nullable: true,
  })
  @MinLength(3, {
    message: 'Password must be more then 3 characters',
    always: false,
  })
  declare password: string

  @Column({
    type: 'text',
    nullable: true,
  })
  @IsOptional()
  declare googleProviderId: string

  /**
   * Won't trigger if we use `repository.save()`
   */
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    const errors: Array<ValidationError> = await validate(this, {
      skipMissingProperties: true,
    })

    if (errors.length > 0) {
      const err: ValidationError = errors[0]

      throw new CodelabValidationError(err.toString())
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password)
  }

  @OneToMany((type) => TypeOrmGraph, (graph) => graph.user)
  @IsOptional()
  declare graphs: Array<TypeOrmGraph>
}
