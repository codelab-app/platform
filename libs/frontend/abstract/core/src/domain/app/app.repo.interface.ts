import type {
  AppFragment,
  AppOptions,
  AppWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IApp } from './app.model.interface'

export type IAppRepository = IRepository<
  IApp,
  AppFragment,
  AppWhere,
  AppOptions
>
