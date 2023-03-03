import type {
  PropFragment,
  PropOptions,
  PropWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IProp } from './prop.model.interface'

export type IPropRepository = IRepository<
  IProp,
  PropFragment,
  PropWhere,
  PropOptions
>
