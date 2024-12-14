import type { IComponentDto, IRef } from '@codelab/shared/abstract/core'
import type {
  ComponentFragment,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/infra/gql'
import type { Overwrite } from 'utility-types'

import type { IRepository } from '../shared'

/**
 * Store needed for clone
 */
export interface IComponentCreateResults {
  id: string
  store: IRef
}

export type IComponentRepository = Overwrite<
  IRepository<
    IComponentDto,
    ComponentFragment,
    ComponentWhere,
    ComponentOptions
  >,
  {
    add(dto: IComponentDto): Promise<IComponentCreateResults>
  }
>
