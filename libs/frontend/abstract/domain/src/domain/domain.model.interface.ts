import type { IDomainDto, IRef } from '@codelab/shared-abstract-core'
import type { Maybe } from '@codelab/shared-abstract-types'
import type { ProductionDomainConfig } from '@codelab/shared-infra-gqlgen'

import type { IModel } from '../shared/models/model.interface'

export interface IDomainModel extends IModel<IDomainDto, IDomainModel> {
  app: IRef
  domainConfig: Maybe<ProductionDomainConfig>
  id: string
  name: string
}
