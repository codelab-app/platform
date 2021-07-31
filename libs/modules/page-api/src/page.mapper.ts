import { DgraphPage, Mapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Page } from './page.model'

@Injectable()
export class PageMapper implements Mapper<DgraphPage, Page> {
  async map(input: DgraphPage) {
    // Leave out the elements to the ResolveFields. That way we don't have to worry about them
    // inside the GetPage/GetPages services (+ we don't always need them and they are expensive to get)
    return new Page(input.uid, input.name, undefined)
  }
}
