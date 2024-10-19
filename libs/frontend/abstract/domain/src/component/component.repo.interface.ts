import type {
  ComponentCreateInput,
  ComponentDeleteInput,
  ComponentFragment,
  ComponentOptions,
  ComponentUpdateInput,
  ComponentWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IComponentModel } from './component.model.interface'

export type IComponentRepository = IRepository<
  ComponentCreateInput,
  ComponentUpdateInput,
  ComponentDeleteInput,
  ComponentFragment,
  ComponentWhere,
  ComponentOptions
>
