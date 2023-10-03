import type {
  AppFragment,
  AppOptions,
  AppWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IAppModel } from './app.model.interface'

export type IAppRepository = IRepository<
  IAppModel,
  AppFragment,
  AppWhere,
  AppOptions
>
