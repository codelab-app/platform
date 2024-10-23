import type {
  IDomainStore,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import type {
  IElementDto,
  IPageCreateFormData,
  IPageDto,
  IPageUpdateFormData,
} from '@codelab/shared/abstract/core'
import type {
  GetRenderedPageQuery,
  PageOptions,
  PageWhere,
} from '@codelab/shared/infra/gql'

import type { ICrudService, IQueryService } from '../services'

export interface ICreatePageUseCase {
  (data: IPageCreateFormData, domainStore: IDomainStore): Promise<IPageModel>
}

export interface IPageService
  extends IQueryService<IPageModel, PageWhere, PageOptions>,
    ICrudService<IPageDto, IPageCreateFormData, IPageUpdateFormData> {
  getPagesByApp(appId: string): Array<IPageModel>
  getRenderedPage(pageId: string): Promise<GetRenderedPageQuery>
  getSelectPageOptions(appId?: string): Promise<Array<SelectOption>>
  loadElements(elements: Array<IElementDto>): void
}
