import type {
  IAppCreateFormData,
  IAppModel,
  IAppUpdateFormData,
} from '@codelab/frontend/abstract/domain'
import type { IPageUpdateFormData, IRef } from '@codelab/shared/abstract/core'
import type { AppOptions, AppWhere } from '@codelab/shared/infra/gql'

import type { ICRUDService, IQueryService } from '../services'

export interface IAppService
  extends ICRUDService<IRef, IAppCreateFormData, IAppUpdateFormData>,
    IQueryService<IAppModel, AppWhere, AppOptions> {
  appList: Array<IAppModel>
  regeneratePages(app: IAppModel, pagesUrls?: Array<string>): Promise<void>
}
