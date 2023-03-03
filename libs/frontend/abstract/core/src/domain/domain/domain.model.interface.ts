import type {
  VercelDomainConfig,
  VercelProjectDomain,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { ICacheService } from '../../service'
import type { IDomainDTO } from './domain.dto.interface'

export interface IDomain extends ICacheService<IDomainDTO, IDomain> {
  id: string
  name: string
  app: IEntity
  domainConfig: VercelDomainConfig
  projectDomain: VercelProjectDomain
}
