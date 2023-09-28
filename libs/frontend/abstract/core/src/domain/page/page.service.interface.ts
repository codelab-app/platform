import type {
  GetRenderedPageQuery,
  PageOptions,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import type {
  IElementDTO,
  IElementRenderTypeDto,
  IPageDTO,
} from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import type { IAppModel } from '../app'
import type { ICreatePageData, IUpdatePageData } from './page.dto.interface'
import type { IPageModel } from './page.model.interface'
import type { IPageRepository } from './page.repo.interface'

export type IPageAppFragment = Pick<IAppModel, 'id' | 'name'>

export interface IPageFactory {
  addSystemPages(
    app: IPageAppFragment,
    renderType: IElementRenderTypeDto,
  ): Array<IPageModel>
}

export interface IPageService
  extends ICRUDService<IPageModel, ICreatePageData, IUpdatePageData>,
    IQueryService<IPageModel, PageWhere, PageOptions>,
    ICRUDModalService<Ref<IPageModel>, { page: Maybe<IPageModel> }>,
    ICRUDFormService<Ref<IPageModel>, { page: Maybe<IPageModel> }> {
  pageFactory: IPageFactory
  pageRepository: IPageRepository
  pages: ObjectMap<IPageModel>
  pagesList: Array<IPageModel>

  add(pageDTO: IPageDTO): IPageModel
  getRenderedPage(pageId: string): Promise<GetRenderedPageQuery>
  loadElements(elements: Array<IElementDTO>): void
  page(id: string): Maybe<IPageModel>
  pagesByApp(appId: string): Array<IPageModel>
}
