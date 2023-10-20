import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import type {
  DomainFragment,
  DomainOptions,
  DomainWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type IDomainRepository = IRepository<
  IDomainModel,
  DomainFragment,
  DomainWhere,
  DomainOptions
>
