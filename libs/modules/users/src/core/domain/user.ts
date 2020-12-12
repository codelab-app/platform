import { Exclude, Type, plainToClass } from 'class-transformer'
import { CreateUserRequest } from '../application/useCases/createUser/CreateUserRequest'
import { UserEmail } from './user-email'
import { UserPassword } from './user-password'
import { AggregateRoot, Result, TransformBoth } from '@codelab/backend'

interface UserProps {
  email: string
  password: string
}

interface UserDto {
  email: UserEmail
  password: UserPassword
}

type DtoResult<T> = {
  [P in keyof T]: Result<T[P]>
}

export class User extends AggregateRoot<UserProps> {
  // @ValidateNested()
  @Type(() => UserEmail)
  @TransformBoth(UserEmail)
  declare email: UserEmail

  // @ValidateNested()
  @Type(() => UserPassword)
  @TransformBoth(UserPassword)
  @Exclude({ toPlainOnly: true })
  declare password: UserPassword

  /**
   * Used for instantiating a User object
   * @param props
   */
  private static hydrate(props: UserProps) {
    const user = plainToClass(User, props)

    return user
  }

  /**
   * Used for creating User
   * @param request
   */
  public static create(request: CreateUserRequest): User {
    const user = User.hydrate(request)

    user.password.hashPassword()

    return user
  }
}
