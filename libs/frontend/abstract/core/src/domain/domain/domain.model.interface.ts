import type {
  VercelDomainConfig,
  VercelProjectDomain,
} from '@codelab/shared/abstract/codegen'
import type { ICacheService } from '../../service'
import type { IDomainDTO } from './domain.dto.interface'

export interface IDomain extends ICacheService<IDomainDTO, IDomain> {
  id: IDomainRef
  name: string
  appId: string
  domainConfig: VercelDomainConfig
  projectDomain: VercelProjectDomain
}

export type IDomainRef = string
