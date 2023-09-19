import type {
  ComponentFragment,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IComponentModel } from './component.model.interface'

export type IComponentRepository = IRepository<
  IComponentModel,
  ComponentFragment,
  ComponentWhere,
  ComponentOptions
>
