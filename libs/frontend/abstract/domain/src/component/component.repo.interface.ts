import type { IComponentDto, IRef } from '@codelab/shared-abstract-core'
import type {
  ComponentFragment,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared-infra-gqlgen'

import type { IRepository } from '../shared'

/**
 * Store needed for clone
 */
export interface IComponentCreateResults {
  id: string
  store: IRef
}

export type IComponentRepository = IRepository<
  IComponentDto,
  ComponentFragment,
  ComponentWhere,
  ComponentOptions
>
