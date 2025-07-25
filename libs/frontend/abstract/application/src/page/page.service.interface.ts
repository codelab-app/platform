import type {
  IDomainStore,
  IPageModel,
} from '@codelab/frontend-abstract-domain'
import type { IPopover, SelectOption } from '@codelab/frontend-abstract-types'
import type {
  IElementDto,
  IPageCreateFormData,
  IPageUpdateFormData,
  IRef,
} from '@codelab/shared-abstract-core'
import type {
  GetRenderedPageQuery,
  PageOptions,
  PageWhere,
} from '@codelab/shared-infra-gqlgen'

import type { ICrudService, IQueryService } from '../services'
import type { PageContextParams } from './page.route.interface'

export interface ICreatePageUseCase {
  (data: IPageCreateFormData, domainStore: IDomainStore): Promise<IPageModel>
}

export interface IPageService
  extends ICrudService<IRef, IPageCreateFormData, IPageUpdateFormData>,
    IQueryService<IPageModel, PageWhere, PageOptions> {
  createPopover: IPopover<PageContextParams, PageContextParams>
  deletePopover: IPopover<PageContextParams, PageContextParams>
  updatePopover: IPopover<PageContextParams, PageContextParams>
  getPagesByApp(appId: string): Array<IPageModel>
  getRenderedPage(pageId: string): Promise<GetRenderedPageQuery>
  getSelectPageOptions(appId?: string): Promise<Array<SelectOption>>
  loadElements(elements: Array<IElementDto>): void
  removeAndNavigate(page: IPageModel): Promise<void>
}
