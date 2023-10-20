import type { IAppModel } from '@codelab/frontend/abstract/domain'
import type {
  AppFragment,
  AppOptions,
  AppWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type IAppRepository = IRepository<
  IAppModel,
  AppFragment,
  AppWhere,
  AppOptions
>
