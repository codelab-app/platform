import type {
  IActionDomainService,
  IAppDomainService,
  IAtomDomainService,
  IAuthGuardDomainService,
  IBuilderDomainService,
  IComponentDomainService,
  IElementDomainService,
  IFieldDomainService,
  IPageDomainService,
  IRedirectDomainService,
  IResourceDomainService,
  IStoreDomainService,
  ITypeDomainService,
  IUserDomainService,
} from '@codelab/frontend/abstract/domain'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { Context } from 'mobx-keystone'
import type { ParsedUrlQuery } from 'querystring'
import type { IActionService } from '../action'
import type { IAdminService } from '../admin'
import type { IAppService } from '../app'
import type { IAtomService } from '../atom'
import type { IAuthGuardService } from '../auth-guard'
import type { IComponentApplicationService } from '../component'
import type { IDomainService } from '../domain'
import type { IElementService } from '../element'
import type { IFieldService } from '../field'
import type { IPageApplicationService } from '../page'
import type { IPropService } from '../prop'
import type { IRedirectService } from '../redirect'
import type { IRendererService } from '../renderer'
import type { IResourceService } from '../resource'
import type { IStoreService } from '../store'
import type { ITagService } from '../tag'
import type { ITypeService } from '../type'
import type { IUserService } from '../user'
import type { IRouterService } from './router.service.interface'

/**
 * Initial data to be injected into store
 */
export interface RootStoreData {
  routerQuery: ParsedUrlQuery
  user: Auth0IdToken
}

export interface IRootStoreDto {
  context: IRootStoreContext
  store: IRootStore
}

export interface IRootStoreDtoTest {
  context: Partial<IRootStoreContext>
  store: Partial<IRootStore>
}

export interface IRootStore {
  actionService: IActionService
  adminService: IAdminService
  appService: IAppService
  atomService: IAtomService
  authGuardService: IAuthGuardService
  builderService: IBuilderDomainService
  componentService: IComponentApplicationService
  domainService: IDomainService
  elementService: IElementService
  fieldService: IFieldService
  pageService: IPageApplicationService
  propService: IPropService
  redirectService: IRedirectService
  rendererService: IRendererService
  resourceService: IResourceService
  routerService: IRouterService
  storeService: IStoreService
  tagService: ITagService
  typeService: ITypeService
  userService: IUserService

  clear(): void
}

type MaybeContext<T> = Context<T | undefined>

export interface IRootStoreContext {
  actionDomainServiceContext: MaybeContext<IActionDomainService>
  actionServiceContext: MaybeContext<IActionService>
  appDomainServiceContext: MaybeContext<IAppDomainService>
  appServiceContext: MaybeContext<IAppService>
  atomDomainServiceContext: MaybeContext<IAtomDomainService>
  atomServiceContext: MaybeContext<IAtomService>
  authGuardDomainServiceContext: MaybeContext<IAuthGuardDomainService>
  authGuardServiceContext: MaybeContext<IAuthGuardService>
  builderDomainServiceContext: MaybeContext<IBuilderDomainService>
  componentDomainServiceContext: MaybeContext<IComponentDomainService>
  componentServiceContext: MaybeContext<IComponentApplicationService>
  domainServiceContext: MaybeContext<IDomainService>
  elementDomainServiceContext: MaybeContext<IElementDomainService>
  elementServiceContext: MaybeContext<IElementService>
  fieldDomainServiceContext: MaybeContext<IFieldDomainService>
  fieldServiceContext: MaybeContext<IFieldService>
  pageDomainServiceContext: MaybeContext<IPageDomainService>
  pageServiceContext: MaybeContext<IPageApplicationService>
  propServiceContext: MaybeContext<IPropService>
  redirectDomainServiceContext: MaybeContext<IRedirectDomainService>
  redirectServiceContext: MaybeContext<IRedirectService>
  rendererServiceContext: MaybeContext<IRendererService>
  resourceDomainServiceContext: MaybeContext<IResourceDomainService>
  resourceServiceContext: MaybeContext<IResourceService>
  storeDomainServiceContext: MaybeContext<IStoreDomainService>
  storeServiceContext: MaybeContext<IStoreService>
  tagServiceContext: MaybeContext<ITagService>
  typeDomainServiceContext: MaybeContext<ITypeDomainService>
  typeServiceContext: MaybeContext<ITypeService>
  userDomainServiceContext: MaybeContext<IUserDomainService>
  userServiceContext: MaybeContext<IUserService>
}
