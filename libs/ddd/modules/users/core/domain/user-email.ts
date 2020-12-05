import { MinLength, validateOrReject } from 'class-validator'
import { Result, ValueObject } from '@codelab/ddd/shared/core'

interface UserEmailProps {
  value: string
}

export class UserEmail extends ValueObject<UserEmailProps> {
  @MinLength(3)
  declare value: string

  public static create(props: UserEmailProps): Result<UserEmail> {
    const userEmail = new UserEmail(props)

    validateOrReject(userEmail).catch((errors) => {
      return Result.fail<UserEmail>(errors)
    })

    return Result.ok<UserEmail>(userEmail)
  }
}
