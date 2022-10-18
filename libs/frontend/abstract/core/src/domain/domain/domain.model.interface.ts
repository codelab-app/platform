import {
  VercelDomainConfig,
  VercelProjectDomain,
} from '@codelab/shared/abstract/codegen'
import { ICacheService } from '../../service'
import { IDomainDTO } from './domain.dto.interface'

export interface IDomain extends ICacheService<IDomainDTO, IDomain> {
  id: IDomainRef
  name: string
  domainConfig: VercelDomainConfig
  projectDomain: VercelProjectDomain
}

export type IDomainRef = string
