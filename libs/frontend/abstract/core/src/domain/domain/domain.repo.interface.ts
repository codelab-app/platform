import type { DomainWhere } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { IDomain } from './domain.model.interface'

export type IDomainRepository = IRepository<IDomain, IEntity, DomainWhere>
