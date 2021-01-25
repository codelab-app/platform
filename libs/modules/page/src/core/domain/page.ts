import { plainToClass } from 'class-transformer'
import { isLeft } from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { PageDTO, PageEntity, PageVO } from './page.codec'

export class Page implements PageEntity {
  declare id: UUID

  declare title: string

  static dto(data: PageDTO) {
    const result = PageDTO.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return result.right
  }

  static create(data: PageDTO) {
    const result = PageVO.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return plainToClass(Page, result.right)
  }

  static hydrate(data: PageDTO) {
    const result = PageEntity.decode(data)

    if (isLeft(result)) {
      const errorMessage = PathReporter.report(result).join(', ')

      throw new Error(errorMessage)
    }

    return plainToClass(Page, result.right)
  }
}
