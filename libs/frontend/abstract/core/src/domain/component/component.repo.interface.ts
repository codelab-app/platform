import type {
  ComponentFragment,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IComponent } from './component.model.interface'

export type IComponentRepository = IRepository<
  IComponent,
  ComponentFragment,
  ComponentWhere,
  ComponentOptions
>
