import type {
  ICreatePageData,
  IPageDomainService,
  IPageModel,
  IUpdatePageData,
} from '@codelab/frontend/abstract/domain'
import type { GetRenderedPageQuery } from '@codelab/shared/abstract/codegen'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import type { DefaultOptionType } from 'antd/lib/select'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
} from '../services'
import type { IPageRepository } from './page.repo.interface'

export interface IPageApplicationService
  extends Omit<
      ICRUDService<IPageModel, ICreatePageData, IUpdatePageData>,
      'update'
    >,
    ICRUDModalService<IPageModel, { page?: IPageModel }>,
    ICRUDFormService<IPageModel, { page?: IPageModel }> {
  pageRepository: IPageRepository

  getRenderedPage(pageId: string): Promise<GetRenderedPageQuery>
  getSelectPageOptions(appId?: string): Promise<Array<DefaultOptionType>>
  loadElements(elements: Array<IElementDTO>): void
}
