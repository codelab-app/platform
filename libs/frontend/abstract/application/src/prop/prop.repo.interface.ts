import type { IPropModel } from '@codelab/frontend/abstract/domain'
import type {
  PropFragment,
  PropOptions,
  PropWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type IPropRepository = IRepository<
  IPropModel,
  PropFragment,
  PropWhere,
  PropOptions
>
