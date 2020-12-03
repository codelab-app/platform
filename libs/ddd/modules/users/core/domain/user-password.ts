import * as bcrypt from 'bcrypt'
import { MinLength } from 'class-validator'
import { ValueObject } from '@codelab/ddd/shared/core'

interface UserPasswordProps {
  value: string
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  @MinLength(3)
  declare value: string

  public async hashPassword() {
    this.value = await bcrypt.hash(this.value, 10)
  }
}
