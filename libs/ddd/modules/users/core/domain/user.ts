import { Type, plainToClass } from 'class-transformer'
import { TransformBoth } from '../../../../shared/common/src/TransformBoth'
import { CreateUserDto } from './dtos/CreateUserDto'
import { UserEmail } from './user-email'
import { UserPassword } from './user-password'
import { AggregateRoot } from '@codelab/ddd/shared/core'

interface UserProps {
  email: UserEmail
  password: UserPassword
}

export class User extends AggregateRoot<UserProps> {
  // @ValidateNested()
  @Type(() => UserEmail)
  @TransformBoth(UserEmail)
  declare email: UserEmail

  // @ValidateNested()
  @Type(() => UserPassword)
  @TransformBoth(UserPassword)
  declare password: UserPassword

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
