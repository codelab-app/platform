import type { IActionDomainService } from '../action'
import type { IAppDomainService } from '../app'
import type { IAtomDomainService } from '../atom'
import type { IAuthGuardDomainService } from '../auth-guard'
import type { IComponentDomainService } from '../component'
import type { IDomainDomainService } from '../domain'
import type { IElementDomainService } from '../element'
import type { IFieldDomainService } from '../field'
import type { IPageDomainService } from '../page'
import type { IRedirectDomainService } from '../redirect'
import type { IResourceDomainService } from '../resource'
import type { IStoreDomainService } from '../store'
import type { ITagDomainService } from '../tag'
import type { ITypeDomainService } from '../type'
import type { IUserDomainService } from '../user'

export interface IDomainStore {
  actionDomainService: IActionDomainService
  appDomainService: IAppDomainService
  atomDomainService: IAtomDomainService
  authGuardDomainService: IAuthGuardDomainService
  componentDomainService: IComponentDomainService
  domainDomainService: IDomainDomainService
  elementDomainService: IElementDomainService
  fieldDomainService: IFieldDomainService
  pageDomainService: IPageDomainService
  redirectDomainService: IRedirectDomainService
  resourceDomainService: IResourceDomainService
  storeDomainService: IStoreDomainService
  tagDomainService: ITagDomainService
  typeDomainService: ITypeDomainService
  userDomainService: IUserDomainService
}
