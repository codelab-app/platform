import { plainToClass } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { CreateUserDto } from './dtos/CreateUserDto'
import { UserEmail } from './user-email'
import { UserPassword } from './user-password'
import { AggregateRoot } from '@codelab/ddd/shared/core'

interface UserProps {
  email: UserEmail
  password: UserPassword
}

export class User extends AggregateRoot<UserProps> {
  @ValidateNested()
  declare email: UserEmail

  @ValidateNested()
  declare password: UserPassword

  // @IsOptional()
  // declare googleProviderId: string

  constructor(props: UserProps) {
    super()

    const { email, password } = props

    this.email = email
    this.password = password
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
