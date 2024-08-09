import type {
  AppFragment,
  AppOptions,
  AppWhere,
} from '@codelab/shared/infra/gql'
import type { IRepository } from '../shared'
import type { IAppModel } from './app.model.interface'

export type IAppRepository = IRepository<
  IAppModel,
  AppFragment,
  AppWhere,
  AppOptions
>
