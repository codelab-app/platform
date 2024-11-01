import type { IAppDto } from '@codelab/shared/abstract/core'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppFragment,
  AppOptions,
  AppPreviewFragment,
  AppUpdateInput,
  AppWhere,
} from '@codelab/shared/infra/gql'

import type { IFindResults, IRepository } from '../shared'
import type { IAppModel } from './app.model.interface'

export type IAppRepository = IRepository<
  IAppDto,
  AppFragment,
  AppWhere,
  AppOptions
> & {
  findPreview(
    where: AppWhere,
    options?: AppOptions,
  ): Promise<IFindResults<AppPreviewFragment>>
}
