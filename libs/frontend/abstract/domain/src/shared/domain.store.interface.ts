import type { IAppDomainService } from '../app'
import type { IAtomDomainService } from '../atom'
import type { IComponentDomainService } from '../component'
import type { IElementDomainService } from '../element'
import type { IPageDomainService } from '../page'
import type { IUserDomainService } from '../user'

export interface IDomainStore {
  appDomainService: IAppDomainService
  atomDomainService: IAtomDomainService
  componentDomainService: IComponentDomainService
  elementDomainService: IElementDomainService
  pageDomainService: IPageDomainService
  userDomainService: IUserDomainService
}
