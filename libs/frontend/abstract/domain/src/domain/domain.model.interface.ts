import type { IDomain, IDomainDto, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type {
  DeleteDomainsMutationVariables,
  DomainCreateInput,
  DomainUpdateInput,
  ProductionDomainConfig,
} from '@codelab/shared/infra/gql'

import type { IModel } from '../shared/models/model.interface'

export interface IDomainModel extends IModel<IDomainDto, IDomainModel> {
  app: IRef
  domainConfig: Maybe<ProductionDomainConfig>
  id: string
  name: string
}
