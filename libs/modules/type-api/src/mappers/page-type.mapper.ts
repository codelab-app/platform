import { DgraphPageType, Mapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { PageType } from '../models'

export type PageTypeMapperInput = DgraphPageType

@Injectable()
export class PageTypeMapper implements Mapper<PageTypeMapperInput, PageType> {
  map({ uid: id, name }: PageTypeMapperInput) {
    return new PageType(id, name)
  }
}
