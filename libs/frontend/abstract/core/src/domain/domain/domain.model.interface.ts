import type {
  DomainCreateInput,
  DomainDeleteInput,
  DomainUpdateInput,
  VercelDomainConfig,
  VercelProjectDomain,
} from '@codelab/shared/abstract/codegen'
import type { IEntity, Maybe } from '@codelab/shared/abstract/types'
import type { ICacheService } from '../../service'
import type { IModel } from '../model.interface'
import type { IDomainDTO } from './domain.dto.interface'

export interface IDomain
  extends ICacheService<IDomainDTO, IDomain>,
    IModel<DomainCreateInput, DomainUpdateInput, DomainDeleteInput> {
  app: IEntity
  domainConfig: Maybe<VercelDomainConfig>
  id: string
  name: string
  projectDomain: Maybe<VercelProjectDomain>
}
