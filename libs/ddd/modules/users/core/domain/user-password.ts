import * as bcrypt from 'bcrypt'
import { MinLength, ValidationArguments } from 'class-validator'
import { ValueObject } from '@codelab/ddd/shared/core'

interface UserPasswordProps {
  value: string
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  @MinLength(3, {
    message: (args: ValidationArguments) =>
      `Password must contain at least ${args.constraints[0]} characters`,
  })
  declare value: string

  public hashPassword() {
    this.value = bcrypt.hashSync(this.value, 10)
  }

  public comparePassword(attempt: string): boolean {
    return bcrypt.compareSync(attempt, this.value)
  }
}
