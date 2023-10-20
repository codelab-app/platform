import type { IPageDomainService } from '@codelab/frontend/abstract/domain'
import { Model, model, prop } from 'mobx-keystone'
import { PageFactory } from './page.factory'

@model('@codelab/PageDomainService')
export class PageDomainService
  extends Model({
    pageFactory: prop(() => new PageFactory({})),
    // pages: prop(() => objectMap<IPageModel>()),
  })
  implements IPageDomainService {
  // @computed
  // get pagesList() {
  //   return [...this.pages.values()]
  // }
  // @modelAction
  // add = (pageDTO: IPageDTO) => {
  //   console.debug('PageService.add()', pageDTO)
  //   let page = this.pages.get(pageDTO.id)
  //   if (page) {
  //     page.writeCache(pageDTO)
  //   } else {
  //     page = Page.create(pageDTO)
  //     this.pages.set(page.id, page)
  //   }
  //   return page
  // }
  // page(id: string) {
  //   return this.pages.get(id)
  // }
  // pagesByApp(appId: string) {
  //   return this.pagesList.filter((page) => page.app.id === appId)
  // }
}
