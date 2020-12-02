import * as bcrypt from 'bcrypt'
// import { Validation } from '@codelab/ddd/shared/core'
import { MinLength, validateOrReject } from 'class-validator'
import { Result, ValueObject } from '@codelab/ddd/shared/core'

export interface UserPasswordProps {
  value: string
  hashed?: boolean
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  @MinLength(3)
  declare value: string

  /**
   * @method comparePassword
   * @desc Compares as plain-text and hashed password.
   */

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string

    if (this.isAlreadyHashed()) {
      hashed = this.props.value

      return this.bcryptCompare(plainTextPassword, hashed)
    }

    return this.props.value === plainTextPassword
  }

  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed, (err, compareResult) => {
      return compareResult
    })
  }

  public isAlreadyHashed(): boolean {
    return this.props.hashed ?? false
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  // public getHashedValue(): Promise<string> {
  //   return new Promise((resolve) => {
  //     if (this.isAlreadyHashed()) {
  //       return resolve(this.props.value)
  //     }

  //     return resolve(this.hashPassword(this.props.value))
  //   })
  // }

  public static create(props: UserPasswordProps): Result<UserPassword> {
    const userPassword = new UserPassword(props)

    validateOrReject(userPassword).catch((errors) => {
      console.log(errors)

      return Result.fail<UserPassword>('Password not valid')
    })

    return Result.ok<UserPassword>(userPassword)
  }
}
