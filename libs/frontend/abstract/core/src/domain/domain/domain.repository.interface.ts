import type {
  DomainFragment,
  DomainWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IDomain } from './domain.model.interface'

export type IDomainRepository = IRepository<
  IDomain,
  DomainFragment,
  DomainWhere
>
