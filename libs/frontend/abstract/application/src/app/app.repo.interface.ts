import type { IAppModel } from '@codelab/frontend/abstract/domain'
import type {
  AppFragment,
  AppOptions,
  AppPreviewFragment,
  AppWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export interface IAppRepository
  extends IRepository<IAppModel, AppFragment, AppWhere, AppOptions> {
  appsList(
    where?: AppWhere,
    options?: AppOptions,
  ): Promise<{
    apps: Array<AppPreviewFragment>
  }>
}
