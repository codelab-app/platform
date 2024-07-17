import type {
  IDomainStore,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { GetRenderedPageQuery } from '@codelab/shared/abstract/codegen'
import type {
  ICreatePageData,
  IElementDto,
} from '@codelab/shared/abstract/core'
import type { DefaultOptionType } from 'antd/lib/select'

export interface ICreatePageUseCase {
  (data: ICreatePageData, domainStore: IDomainStore): Promise<IPageModel>
}

export interface IPageApplicationService {
  getPagesByApp(appId: string): Array<IPageModel>
  getRenderedPage(pageId: string): Promise<GetRenderedPageQuery>
  getSelectPageOptions(appId?: string): Promise<Array<DefaultOptionType>>
  loadElements(elements: Array<IElementDto>): void
}
