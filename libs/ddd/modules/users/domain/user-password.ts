import * as Joi from '@hapi/joi'
import * as bcrypt from 'bcrypt'
// import { Validation } from '@codelab/ddd/shared/domain'
import { IsGoodPasswordStrength } from './specifications/IsGoodPasswordStrength'
import { Result, ValueObject } from '@codelab/ddd/shared/domain'

export interface IUserPasswordProps {
  value: string
  // hashed?: boolean
}

interface Validation {
  rules: any
}

export class UserPassword extends ValueObject<IUserPasswordProps> {
  private static rules = Joi.string().min(3).required()

  get value(): string {
    return this.props.value
  }

  private constructor(props: IUserPasswordProps) {
    super(props)
  }

  // private static isAppropriateLength(password: string): boolean {
  //   return password.length >= this.minLength
  // }

  /**
   * @method comparePassword
   * @desc Compares as plain-text and hashed password.
   */

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string

    // if (this.isAlreadyHashed()) {
    //   hashed = this.props.value

    //   return this.bcryptCompare(plainTextPassword, hashed)
    // }

    return this.props.value === plainTextPassword
  }

  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false)

        return resolve(compareResult)
      })
    })
  }

  // public isAlreadyHashed(): boolean {
  //   return this.props.hashed ?? false
  // }

  // private hashPassword(password: string): Promise<string> {
  //   return bcrypt.hash(password, 10)
  // }

  // public getHashedValue(): Promise<string> {
  //   return new Promise((resolve) => {
  //     if (this.isAlreadyHashed()) {
  //       return resolve(this.props.value)
  //     }

  //     return resolve(this.hashPassword(this.props.value))
  //   })
  // }

  public static create(props: IUserPasswordProps): Result<UserPassword> {
    const rules = new IsGoodPasswordStrength<IUserPasswordProps, UserPassword>()

    if (rules.isNotSatisfiedBy(props)) {
      return Result.fail<UserPassword>('Password strength')
    }

    return Result.ok<UserPassword>(
      new UserPassword({
        value: props.value,
      }),
    )
  }
}
