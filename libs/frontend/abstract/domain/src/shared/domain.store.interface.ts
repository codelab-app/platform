import type { IAppDomainService } from '../app'
import type { IAtomDomainService } from '../atom'
import type { IPageDomainService } from '../page'
import type { IUserDomainService } from '../user'

export interface IDomainStore {
  appDomainService: IAppDomainService
  atomDomainService: IAtomDomainService
  domainDomainService: IDomainDomainService
  pageDomainService: IPageDomainService
  userDomainService: IUserDomainService
}
