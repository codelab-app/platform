import type {
  DomainFragment,
  DomainOptions,
  DomainWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IDomainModel } from './domain.model.interface'

export type IDomainRepository = IRepository<
  IDomainModel,
  DomainFragment,
  DomainWhere,
  DomainOptions
>
