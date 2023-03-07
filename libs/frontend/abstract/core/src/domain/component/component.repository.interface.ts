import type { ComponentWhere } from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { ComponentFragment } from './component.fragment.graphql.gen'
import type { IComponent } from './component.model.interface'

export type IComponentRepository = IRepository<
  IComponent,
  ComponentFragment,
  ComponentWhere
>
