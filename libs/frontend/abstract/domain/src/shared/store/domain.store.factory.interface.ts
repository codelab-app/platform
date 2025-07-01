import type { Context } from 'mobx-keystone'

import type { IActionDomainService } from '../../action'
import type { IAppDomainService } from '../../app'
import type { IAtomDomainService } from '../../atom'
import type { IAuthGuardDomainService } from '../../auth-guard'
import type { IComponentDomainService } from '../../component'
import type { IDomainDomainService } from '../../domain'
import type { IElementDomainService } from '../../element'
import type { IFieldDomainService } from '../../field'
import type { IPageDomainService } from '../../page'
import type { IRedirectDomainService } from '../../redirect'
import type { IResourceDomainService } from '../../resource'
import type { IStoreDomainService } from '../../store'
import type { ITagDomainService } from '../../tag'
import type { ITypeDomainService } from '../../type'
import type { IUserDomainService } from '../../user'
import type { IDomainStore } from './domain.store.interface'

type MaybeContext<T> = Context<T | undefined>

export interface IDomainStoreFactoryDto {
  context: Partial<IDomainStoreContext>
  store: Partial<IDomainStore>
}

export interface IDomainStoreContext {
  actionDomainServiceContext: MaybeContext<IActionDomainService>
  appDomainServiceContext: MaybeContext<IAppDomainService>
  atomDomainServiceContext: MaybeContext<IAtomDomainService>
  authGuardDomainServiceContext: MaybeContext<IAuthGuardDomainService>
  componentDomainServiceContext: MaybeContext<IComponentDomainService>
  domainDomainServiceContext: MaybeContext<IDomainDomainService>
  elementDomainServiceContext: MaybeContext<IElementDomainService>
  fieldDomainServiceContext: MaybeContext<IFieldDomainService>
  pageDomainServiceContext: MaybeContext<IPageDomainService>
  redirectDomainServiceContext: MaybeContext<IRedirectDomainService>
  resourceDomainServiceContext: MaybeContext<IResourceDomainService>
  storeDomainServiceContext: MaybeContext<IStoreDomainService>
  tagDomainServiceContext: MaybeContext<ITagDomainService>
  typeDomainServiceContext: MaybeContext<ITypeDomainService>
  userDomainServiceContext: MaybeContext<IUserDomainService>
}
