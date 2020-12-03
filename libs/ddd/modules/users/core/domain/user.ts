import { plainToClass } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { UserEmail } from './user-email'
import { UserPassword } from './user-password'

interface UserProps {
  email: string
}

export class User {
  @ValidateNested()
  declare email: UserEmail

  @ValidateNested()
  declare password: UserPassword

  // @IsOptional()
  // declare googleProviderId: string

  public static hydrate(props: UserProps) {
    const user: User = plainToClass(User, props)

    return user
  }

  // public static async new(data: ): Promise<User> {}
}
