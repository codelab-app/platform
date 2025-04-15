import type { IDomainDto } from '@codelab/shared-abstract-core'
import type {
  DomainFragment,
  DomainOptions,
  DomainWhere,
} from '@codelab/shared-infra-gqlgen'

import type { IRepository } from '../shared'

export type IDomainRepository = IRepository<
  IDomainDto,
  DomainFragment,
  DomainWhere,
  DomainOptions
>
