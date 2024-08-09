import type {
  IAppModel,
  ICreateAppData,
  IUpdateAppData,
} from '@codelab/frontend/abstract/domain'
import type { AppOptions, AppWhere } from '@codelab/shared/infra/gql'
import type { IUpdatePageData } from '@codelab/shared/abstract/core'
import type { ICRUDService, IQueryService } from '../services'

export interface IAppService
  extends ICRUDService<IAppModel, ICreateAppData, IUpdateAppData>,
    IQueryService<IAppModel, AppWhere, AppOptions> {
  regeneratePages(app: IAppModel, pagesUrls?: Array<string>): Promise<void>
  updatePage(data: IUpdatePageData): Promise<void>
}
