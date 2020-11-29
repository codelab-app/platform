import * as Joi from '@hapi/joi'
import { Result, ValueObject } from '@codelab/ddd/shared/domain'

export interface UserEmailProps {
  value: string
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value
  }

  private constructor(props: UserEmailProps) {
    super(props)
  }

  private static isValidEmail(email: string) {
    const schema = Joi.string().email({})

    return schema.validate(email)
  }

  private static format(email: string): string {
    return email.trim().toLowerCase()
  }

  public static create(email: string): Result<UserEmail> {
    if (!this.isValidEmail(email)) {
      return Result.fail<UserEmail>('Email address not valid')
    }

    return Result.ok<UserEmail>(new UserEmail({ value: this.format(email) }))
  }
}
