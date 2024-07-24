import type {
  DomainFragment,
  DomainOptions,
  DomainWhere,
} from '@codelab/frontend/infra/gql'
import type { IRepository } from '../shared'
import type { IDomainModel } from './domain.model.interface'

export type IDomainRepository = IRepository<
  IDomainModel,
  DomainFragment,
  DomainWhere,
  DomainOptions
>
