import type {
  PropCreateInput,
  PropFragment,
  PropOptions,
  PropUpdateInput,
  PropWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IPropModel } from './prop.model.interface'

export type IPropRepository = IRepository<
  PropCreateInput,
  PropUpdateInput,
  never,
  PropFragment,
  PropWhere,
  PropOptions
>
