import { plainToClass } from 'class-transformer'
import { isLeft } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { EdgeDTO, EdgeEntity, EdgeVO } from './edge.codec'

export class Edge implements EdgeEntity {
  declare id: UUID

  declare source: string

  declare target: string

  declare order: t.Int

  /**
   * Used to pass around user data, very loose check. Used to check whether keys are correct & whether values are correct on a primitive type checking level.
   *
   * Doesn't validate data at an application level.
   *
   * @param data
   */
  static dto(data: EdgeDTO) {
    const result = EdgeDTO.decode(data)

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
  static create(data: EdgeDTO) {
    const result = EdgeVO.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return plainToClass(Edge, result.right)
  }

  /**
   * This is used for hydrating an object from query data, id is required here
   * @param data
   */
  static hydrate(data: EdgeDTO) {
    const result = EdgeEntity.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return plainToClass(Edge, result.right)
  }
}
