import type { IDomain, IDomainDto, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type {
  DeleteDomainsMutationVariables,
  DomainCreateInput,
  DomainUpdateInput,
  ProductionDomainConfig,
} from '@codelab/shared/infra/gql'

import type { ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'

export interface IDomainModel
  extends ICacheService<IDomainDto, IDomainModel>,
    IModel<IDomain> {
  app: IRef
  domainConfig: Maybe<ProductionDomainConfig>
  id: string
  name: string
}
