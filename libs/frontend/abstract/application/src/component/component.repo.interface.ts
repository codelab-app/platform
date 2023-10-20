import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type {
  ComponentFragment,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type IComponentRepository = IRepository<
  IComponentModel,
  ComponentFragment,
  ComponentWhere,
  ComponentOptions
>
