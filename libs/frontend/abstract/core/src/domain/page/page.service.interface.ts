import type {
  GetRenderedPageAndCommonAppDataQuery,
  GetRenderedPageQuery,
  PageOptions,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import type { IApp } from '../app'
import type {
  ICreatePageData,
  IPageDTO,
  IUpdatePageData,
} from './page.dto.interface'
import type { IPage } from './page.model.interface'
import type { IPageRepository } from './page.repository.interface'

export interface IPageFactory {
  addSystemPages(app: Pick<IApp, 'id' | 'owner'>): Array<IPage>
}

export interface IPageService
  extends ICRUDService<IPage, ICreatePageData, IUpdatePageData>,
    IQueryService<IPage, PageWhere, PageOptions>,
    ICRUDModalService<Ref<IPage>, { page: Maybe<IPage> }> {
  pages: ObjectMap<IPage>
  pagesList: Array<IPage>

  pageRepository: IPageRepository
  pageFactory: IPageFactory

  page(id: string): Maybe<IPage>
  pagesByApp(appId: string): Array<IPage>
  getRenderedPage(pageId: string): Promise<GetRenderedPageQuery>
  getRenderedPageAndCommonAppData(
    appId: string,
    pageId: string,
  ): Promise<GetRenderedPageAndCommonAppDataQuery>
  add(pageDTO: IPageDTO): IPage
}
