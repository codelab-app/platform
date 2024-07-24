import type {
  ComponentFragment,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/frontend/infra/gql'
import type { IRepository } from '../shared'
import type { IComponentModel } from './component.model.interface'

export type IComponentRepository = IRepository<
  IComponentModel,
  ComponentFragment,
  ComponentWhere,
  ComponentOptions
>
