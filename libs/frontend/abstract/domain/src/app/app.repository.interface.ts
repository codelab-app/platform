import type {
  AppCreateInput,
  AppDeleteInput,
  AppFragment,
  AppOptions,
  AppUpdateInput,
  AppWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IAppModel } from './app.model.interface'

export type IAppRepository = IRepository<
  AppCreateInput,
  AppUpdateInput,
  AppDeleteInput,
  AppFragment,
  AppWhere,
  AppOptions
>
