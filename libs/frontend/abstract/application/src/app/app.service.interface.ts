import type {
  IAppCreateFormData,
  IAppModel,
  IAppUpdateFormData,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { AppOptions, AppWhere } from '@codelab/shared/infra/gql'

import type { ICrudService, IQueryService } from '../services'

export interface IAppService
  extends ICrudService<IRef, IAppCreateFormData, IAppUpdateFormData>,
    IQueryService<IAppModel, AppWhere, AppOptions> {
  regeneratePages(app: IAppModel, pagesUrls?: Array<string>): Promise<void>
}
