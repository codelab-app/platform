import { Transform, Type, plainToClass } from 'class-transformer'
import { CreateUserDto } from './dtos/CreateUserDto'
import { UserEmail } from './user-email'
import { UserPassword } from './user-password'
import { AggregateRoot } from '@codelab/ddd/shared/core'

interface UserProps {
  email: UserEmail
  password: UserPassword
  date?: Date
}

export class User extends AggregateRoot<UserProps> {
  // @ValidateNested()
  @Type(() => UserEmail)
  @Transform((value) => value.toString())
  declare email: UserEmail

  @Type(() => Date)
  declare date: Date

  // @ValidateNested()
  @Type(() => UserPassword)
  @Transform((value) => value.toString())
  declare password: UserPassword

  constructor(props: UserProps) {
    super()

    Object.assign(this, props)
  }

  public static hydrate(props: UserProps) {
    const user: User = plainToClass(User, props)

    return user
  }

  public static create(request: CreateUserDto): User {
    const { email, password } = request

    password.hashPassword()

    return new User({ email, password })
  }
}
