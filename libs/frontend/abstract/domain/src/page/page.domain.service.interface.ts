import type { IElementRenderTypeDto } from '@codelab/shared/abstract/core'
import type { IAppModel } from '../app'
import type { IPageModel } from './page.model.interface'

export type IPageAppFragment = Pick<IAppModel, 'id' | 'name'>

export interface IPageFactory {
  addSystemPages(
    app: IPageAppFragment,
    renderType: IElementRenderTypeDto,
  ): Array<IPageModel>
}

export interface IPageDomainService {
  pageFactory: IPageFactory
  // pages: ObjectMap<IPageModel>
  // pagesList: Array<IPageModel>

  // page(id: string): Maybe<IPageModel>
  // pagesByApp(appId: string): Array<IPageModel>
}
