import type { Context } from 'mobx-keystone'
import type { IAppDomainService } from '../../app'
import type { IAtomDomainService } from '../../atom'
import type { IComponentDomainService } from '../../component'
import type { IElementDomainService } from '../../element'
import type { IFieldDomainService } from '../../field'
import type { IPageDomainService } from '../../page'
import type { IRedirectDomainService } from '../../redirect'
import type { IResourceDomainService } from '../../resource'
import type { IStoreDomainService } from '../../store'
import type { ITypeDomainService } from '../../type'
import type { IUserDomainService } from '../../user'

type MaybeContext<T> = Context<T | undefined>

export interface IRootDomainStoreDto {
  context: Partial<IRootDomainContext>
  store: Partial<IRootDomainStore>
}

export interface IRootDomainStore {
  appDomainService: IAppDomainService
  atomDomainService: IAtomDomainService
  componentDomainService: IComponentDomainService
  elementDomainService: IElementDomainService
  fieldDomainService: IFieldDomainService
  pageDomainService: IPageDomainService
  redirectDomainService: IRedirectDomainService
  resourceDomainService: IResourceDomainService
  storeDomainService: IStoreDomainService
  typeDomainService: ITypeDomainService
  userDomainService: IUserDomainService

  clear(): void
}

export interface IRootDomainContext {
  appDomainServiceContext: MaybeContext<IAppDomainService>
  atomDomainServiceContext: MaybeContext<IAtomDomainService>
  componentDomainServiceContext: MaybeContext<IComponentDomainService>
  elementDomainServiceContext: MaybeContext<IElementDomainService>
  fieldDomainServiceContext: MaybeContext<IFieldDomainService>
  pageDomainServiceContext: MaybeContext<IPageDomainService>
  redirectDomainServiceContext: MaybeContext<IRedirectDomainService>
  resourceDomainServiceContext: MaybeContext<IResourceDomainService>
  storeDomainServiceContext: MaybeContext<IStoreDomainService>
  typeDomainServiceContext: MaybeContext<ITypeDomainService>
  userDomainServiceContext: MaybeContext<IUserDomainService>
}
