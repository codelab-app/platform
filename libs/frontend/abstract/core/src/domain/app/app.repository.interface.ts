import type { AppWhere } from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type {
  AppFragment,
  AppPreviewFragment,
} from './app.fragment.graphql.gen'
import type { IApp } from './app.model.interface'

export type IAppRepository = IRepository<
  IApp,
  AppFragment | AppPreviewFragment,
  AppWhere
>
