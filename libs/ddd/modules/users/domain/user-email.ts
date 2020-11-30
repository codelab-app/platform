import { IsEmail, validateOrReject } from 'class-validator'
import { Result, ValueObject } from '@codelab/ddd/shared/domain'

export interface UserEmailProps {
  value: string
}

export class UserEmail extends ValueObject<UserEmailProps> {
  @IsEmail()
  declare value: string

  public static create(props: UserEmailProps): Result<UserEmail> {
    const userEmail = new UserEmail(props)

    validateOrReject(userEmail).catch((errors) => {
      console.log(errors)

      return Result.fail<UserEmail>('Email address not valid')
    })

    return Result.ok<UserEmail>(userEmail)
  }
}
