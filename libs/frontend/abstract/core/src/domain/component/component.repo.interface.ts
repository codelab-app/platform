import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { IComponent } from './component.model.interface'

export type IComponentRepository = IRepository<
  IComponent,
  IEntity,
  ComponentWhere,
  ComponentOptions
>
