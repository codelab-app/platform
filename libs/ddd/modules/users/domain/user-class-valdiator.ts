import { IsEmail, IsOptional, MinLength } from 'class-validator'
import { AggregateRoot } from '@codelab/ddd/shared/domain'

interface UserProps {
  email: string
}

export class User extends AggregateRoot<UserProps> {
  @IsEmail({ allow_display_name: false }, { message: 'Invalid email' })
  declare email: string

  @MinLength(3, {
    message: 'Password must be more then 3 characters',
    always: false,
  })
  declare password: string

  @IsOptional()
  declare googleProviderId: string
}
