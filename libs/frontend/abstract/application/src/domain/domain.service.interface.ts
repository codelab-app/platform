import type {
  ICreateDomainData,
  IDomainModel,
} from '@codelab/frontend-abstract-domain'
import type { IRef } from '@codelab/shared-abstract-core'
import type { DomainOptions, DomainWhere } from '@codelab/shared-infra-gqlgen'

import type { ICrudService, IQueryService } from '../services'

export interface IDomainService
  extends ICrudService<IRef, ICreateDomainData, ICreateDomainData>,
    Omit<IQueryService<IDomainModel, DomainWhere, DomainOptions>, 'getOne'> {}
