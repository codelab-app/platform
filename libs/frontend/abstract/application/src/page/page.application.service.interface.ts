import type {
  IPageDomainService,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type {
  GetRenderedPageQuery,
  PageOptions,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import type {
  ICreatePageData,
  IElementDto,
  IUpdatePageData,
} from '@codelab/shared/abstract/core'
import type { DefaultOptionType } from 'antd/lib/select'
import type { Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../services'
import type { IPageRepository } from './page.repo.interface'

export interface IPageApplicationService
  extends Omit<
      ICRUDService<IPageModel, ICreatePageData, IUpdatePageData>,
      'update'
    >,
    IQueryService<IPageModel, PageWhere, PageOptions>,
    ICRUDModalService<Ref<IPageModel>, { page?: IPageModel }>,
    ICRUDFormService<Ref<IPageModel>, { page?: IPageModel }> {
  pageDomainService: IPageDomainService
  pageRepository: IPageRepository

  getPagesByApp(appId: string): Array<IPageModel>
  getRenderedPage(pageId: string): Promise<GetRenderedPageQuery>
  getSelectPageOptions(appId?: string): Promise<Array<DefaultOptionType>>
  loadElements(elements: Array<IElementDto>): void
}
