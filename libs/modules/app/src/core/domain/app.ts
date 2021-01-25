import { plainToClass } from 'class-transformer'
import { isLeft } from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { AppDTO, AppEntity, AppVO } from './app.codec'

export class App implements AppEntity {
  declare id: UUID

  declare title: string

  /**
   * Used to pass around user data, very loose check. Used to check whether keys are correct & whether values are correct on a primitive type checking level.
   *
   * Doesn't validate data at an application level.
   *
   * @param data
   */
  static dto(data: AppDTO) {
    const result = AppDTO.decode(data)

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
  static create(data: AppDTO) {
    const result = AppVO.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return plainToClass(App, result.right)
  }

  /**
   * This is used for hydrating an object from query data, id is required here
   * @param data
   */
  static hydrate(data: AppDTO) {
    const result = AppEntity.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return plainToClass(App, result.right)
  }
}
