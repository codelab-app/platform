import type {
  PropFragment,
  PropOptions,
  PropWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IPropModel } from './prop.model.interface'

export type IPropRepository = IRepository<
  IPropModel,
  PropFragment,
  PropWhere,
  PropOptions
>
