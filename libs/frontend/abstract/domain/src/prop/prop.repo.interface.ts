import type { IPropDto } from '@codelab/shared/abstract/core'
import type {
  CreatePropsMutationVariables,
  PropCreateInput,
  PropFragment,
  PropOptions,
  PropUpdateInput,
  PropWhere,
  UpdatePropsMutationVariables,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IPropModel } from './prop.model.interface'

export type IPropRepository = IRepository<
  IPropDto,
  PropFragment,
  PropWhere,
  PropOptions
>
