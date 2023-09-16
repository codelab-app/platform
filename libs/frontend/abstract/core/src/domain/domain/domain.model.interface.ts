import type {
  DomainCreateInput,
  DomainDeleteInput,
  DomainUpdateInput,
  VercelDomainConfig,
  VercelProjectDomain,
} from '@codelab/shared/abstract/codegen'
import type { IDomainDTO } from '@codelab/shared/abstract/core'
import type { IEntity, Maybe } from '@codelab/shared/abstract/types'
import type { ICacheService } from '../../service'
import type { IModel } from '../model.interface'

export interface IDomainModel
  extends ICacheService<IDomainDTO, IDomainModel>,
    IModel<DomainCreateInput, DomainUpdateInput, DomainDeleteInput> {
  app: IEntity
  domainConfig: Maybe<VercelDomainConfig>
  id: string
  name: string
  projectDomain: Maybe<VercelProjectDomain>
}
