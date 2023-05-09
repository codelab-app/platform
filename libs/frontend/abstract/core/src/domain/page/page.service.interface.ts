import type {
  GetRenderedPageQuery,
  PageOptions,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import type { IPageDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import type { IApp } from '../app'
import type { ICreatePageData, IUpdatePageData } from './page.dto.interface'
import type { IPage } from './page.model.interface'
import type { IPageRepository } from './page.repo.interface'

export type IPageAppFragment = Pick<IApp, 'id' | 'name' | 'owner'>

export interface IPageFactory {
  addSystemPages(app: IPageAppFragment): Array<IPage>
}

export interface IPageService
  extends ICRUDService<IPage, ICreatePageData, IUpdatePageData>,
    IQueryService<IPage, PageWhere, PageOptions>,
    ICRUDModalService<Ref<IPage>, { page: Maybe<IPage> }>,
    ICRUDFormService<Ref<IPage>, { page: Maybe<IPage> }> {
  pageFactory: IPageFactory
  pageRepository: IPageRepository
  pages: ObjectMap<IPage>
  pagesList: Array<IPage>

  add(pageDTO: IPageDTO): IPage
  getRenderedPage(pageId: string): Promise<GetRenderedPageQuery>
  page(id: string): Maybe<IPage>
  pagesByApp(appId: string): Array<IPage>
}
