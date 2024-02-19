import type {
  DomainCreateInput,
  DomainDeleteInput,
  DomainUpdateInput,
  VercelDomainConfig,
  VercelProjectDomain,
} from '@codelab/shared/abstract/codegen'
import type { IDomain, IDomainDto, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'

export interface IDomainModel
  extends ICacheService<IDomainDto, IDomainModel>,
    IModel<DomainCreateInput, DomainUpdateInput, DomainDeleteInput, IDomain> {
  app: IRef
  domainConfig: Maybe<VercelDomainConfig>
  id: string
  name: string
  projectDomain: Maybe<VercelProjectDomain>
}
