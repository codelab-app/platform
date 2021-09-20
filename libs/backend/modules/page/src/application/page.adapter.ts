import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphPage } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Page } from '../domain/page.model'

@Injectable()
export class PageAdapter extends BaseAdapter<DgraphPage, Page> {
  mapItem(input: DgraphPage) {
    // Leave out the elements to the ResolveFields. That way we don't have to worry about them
    // inside the GetPage/GetPages services (+ we don't always need them and they are expensive to get)
    return new Page(input.uid, input.name, undefined)
  }
}
