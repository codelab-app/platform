import type {
  IDomainStore,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { PageOptions, PageWhere } from '@codelab/frontend/infra/gql'
import type { GetRenderedPageQuery } from '@codelab/shared/abstract/codegen'
import type {
  ICreatePageData,
  IElementDto,
  IUpdatePageData,
} from '@codelab/shared/abstract/core'
import type { ICRUDService, IQueryService } from '../services'

export interface ICreatePageUseCase {
  (data: ICreatePageData, domainStore: IDomainStore): Promise<IPageModel>
}

export interface IPageService
  extends IQueryService<IPageModel, PageWhere, PageOptions>,
    ICRUDService<IPageModel, ICreatePageData, IUpdatePageData> {
  getPagesByApp(appId: string): Array<IPageModel>
  getRenderedPage(pageId: string): Promise<GetRenderedPageQuery>
  getSelectPageOptions(appId?: string): Promise<Array<SelectOption>>
  loadElements(elements: Array<IElementDto>): void
}
