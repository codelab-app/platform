import type {
  AppFragment,
  AppOptions,
  AppPreviewFragment,
  AppWhere,
} from '@codelab/frontend/infra/gql'
import type { IRepository } from '../shared'
import type { IAppModel } from './app.model.interface'

export type IAppRepository = IRepository<
  IAppModel,
  AppFragment | AppPreviewFragment,
  AppWhere,
  AppOptions
>
