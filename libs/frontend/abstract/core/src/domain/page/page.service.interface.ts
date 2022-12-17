import type {
  GetRenderedPageAndCommonAppDataQuery,
  GetRenderedPageQuery,
  PageOptions,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import type {
  ICreatePageDTO,
  IPageDTO,
  IUpdatePageDTO,
} from './page.dto.interface'
import type { IPage } from './page.model.interface'

export interface IPageService
  extends ICRUDService<IPage, ICreatePageDTO, IUpdatePageDTO>,
    IQueryService<IPage, PageWhere, PageOptions>,
    ICRUDModalService<Ref<IPage>, { page: Maybe<IPage> }>,
    ICacheService<IPageDTO, IPage> {
  /**
   * Properties
   */
  pages: ObjectMap<IPage>
  pagesList: Array<IPage>
  page(id: string): Maybe<IPage>
  pagesByApp(appId: string): Array<IPage>
  getRenderedPage(pageId: string): Promise<GetRenderedPageQuery>
  getRenderedPageAndCommonAppData(
    appId: string,
    pageId: string,
  ): Promise<GetRenderedPageAndCommonAppDataQuery>
}
