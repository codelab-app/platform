import type {
  DomainCreateInput,
  DomainDeleteInput,
  DomainFragment,
  DomainOptions,
  DomainUpdateInput,
  DomainWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IDomainModel } from './domain.model.interface'

export type IDomainRepository = IRepository<
  DomainCreateInput,
  DomainUpdateInput,
  DomainDeleteInput,
  DomainFragment,
  DomainWhere,
  DomainOptions
>
