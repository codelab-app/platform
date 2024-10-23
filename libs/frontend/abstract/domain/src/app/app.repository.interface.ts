import type { IAppDto } from '@codelab/shared/abstract/core'
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
  IAppDto,
  AppFragment,
  AppWhere,
  AppOptions
>
