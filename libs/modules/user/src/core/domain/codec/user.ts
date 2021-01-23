import { plainToClass } from 'class-transformer'
import { isLeft } from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { UserDtoC, UserEntityC, UserVoC } from './user.codec'
import { Email, Password } from '@codelab/backend'

export class User<ID> implements UserVoC {
  declare id: UUID

  declare email: Email

  declare password: Password

  /**
   * Used to pass around user data, very loose check. Used to check whether keys are correct & whether values are correct on a primitive type checking level.
   *
   * Doesn't validate data at an application level.
   *
   * @param data
   */
  static dto(data: UserDtoC) {
    const result = UserDtoC.decode(data)

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
  static create(data: UserDtoC) {
    const result = UserVoC.decode(data)

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
  static hydrate(data: UserDtoC) {
    const result = UserEntityC.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return plainToClass(User, result.right)
  }
}
