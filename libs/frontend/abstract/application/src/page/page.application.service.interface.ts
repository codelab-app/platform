import type {
  IDomainStore,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { PageOptions, PageWhere } from '@codelab/frontend/infra/gql'
import type { GetRenderedPageQuery } from '@codelab/shared/abstract/codegen'
import type {
  ICreatePageData,
  IElementDto,
} from '@codelab/shared/abstract/core'
import type { DefaultOptionType } from 'antd/lib/select'
import type { IQueryService } from '../services'

export interface ICreatePageUseCase {
  (data: ICreatePageData, domainStore: IDomainStore): Promise<IPageModel>
}

export interface IPageApplicationService
  extends IQueryService<IPageModel, PageWhere, PageOptions> {
  getPagesByApp(appId: string): Array<IPageModel>
  getRenderedPage(pageId: string): Promise<GetRenderedPageQuery>
  getSelectPageOptions(appId?: string): Promise<Array<DefaultOptionType>>
  loadElements(elements: Array<IElementDto>): void
}
