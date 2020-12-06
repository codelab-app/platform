import { IsEmail, validateSync } from 'class-validator'
import { Result, ValueObject } from '@codelab/ddd/shared/core'

interface UserEmailProps {
  value: string
}

export class UserEmail extends ValueObject<UserEmailProps> {
  @IsEmail(
    {},
    {
      message: 'Email must be valid',
    },
  )
  declare value: string

  public static create(props: UserEmailProps): Result<UserEmail> {
    const userEmail = new UserEmail(props)
    const validationErrors = validateSync(userEmail)

    if (validationErrors.length) {
      const errors = Object.values(validationErrors[0].constraints ?? {})

      return Result.fail<UserEmail>(errors)
    }

    return Result.ok<UserEmail>(userEmail)
  }
}
