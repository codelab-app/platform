import { MinLength } from 'class-validator'
import { ValueObject } from '../ValueObject'

interface UserEmailProps {
  value: string
}

export class UUID extends ValueObject<UserEmailProps> {
  @MinLength(3)
  declare value: string
}
