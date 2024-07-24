import type {
  PropFragment,
  PropOptions,
  PropWhere,
} from '@codelab/frontend/infra/gql'
import type { IRepository } from '../shared'
import type { IPropModel } from './prop.model.interface'

export type IPropRepository = IRepository<
  IPropModel,
  PropFragment,
  PropWhere,
  PropOptions
>
