import { plainToClass } from 'class-transformer'
import { isLeft } from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { VertexDTO, VertexEntity, VertexVO } from './vertex.codec'

export class Vertex implements VertexEntity {
  declare id: UUID

  declare title: string

  declare type: string

  declare graphId: string

  /**
   * Used to pass around user data, very loose check. Used to check whether keys are correct & whether values are correct on a primitive type checking level.
   *
   * Doesn't validate data at an application level.
   *
   * @param data
   */
  static dto(data: VertexDTO) {
    const result = VertexDTO.decode(data)

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
  static create(data: VertexDTO) {
    const result = VertexVO.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return plainToClass(Vertex, result.right)
  }

  /**
   * This is used for hydrating an object from query data, id is required here
   * @param data
   */
  static hydrate(data: VertexDTO) {
    const result = VertexEntity.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return plainToClass(Vertex, result.right)
  }
}
