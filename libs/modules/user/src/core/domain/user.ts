import * as bcrypt from 'bcrypt'
import { plainToClass } from 'class-transformer'
import { isLeft } from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { UserDTO, UserEntity, UserVO } from './user.codec'
import { Email, Password } from '@codelab/backend'

export class User implements UserEntity {
  declare id: UUID

  declare email: Email

  declare password: Password

  declare accessToken?: string

  /**
   * Used to pass around user data, very loose check. Used to check whether keys are correct & whether values are correct on a primitive type checking level.
   *
   * Doesn't validate data at an application level.
   *
   * @param data
   */
  static dto(data: UserDTO) {
    const result = UserDTO.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return result.right
  }

  /**
   * Used for creating a value object for creating new models. This is a special case where id not not required, but all other fields must be validated.
   *
   * @param data
   */
  static create(data: UserDTO) {
    const result = UserVO.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return plainToClass(User, result.right)
  }

  /**
   * This is used for hydrating an object from query data, id is required here
   * @param data
   */
  static hydrate(data: UserDTO) {
    const result = UserEntity.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return plainToClass(User, result.right)
  }

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10) as Password
  }

  public comparePassword(attempt: string): boolean {
    return bcrypt.compareSync(attempt, this.password)
  }

  public setAccessToken(token: string) {
    this.accessToken = token
  }
}
