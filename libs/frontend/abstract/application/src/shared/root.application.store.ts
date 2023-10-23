import type {
  IAtomDomainService,
  IBuilderDomainService,
  IStoreDomainService,
  ITypeDomainService,
} from '@codelab/frontend/abstract/domain'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { Context } from 'mobx-keystone'
import type { IActionService } from '../action'
import type { IAdminService } from '../admin'
import type { IAppService } from '../app'
import type { IAtomService } from '../atom'
import type { IComponentApplicationService } from '../component'
import type { IDomainService } from '../domain'
import type { IElementApplicationService, IElementService } from '../element'
import type { IFieldService } from '../field'
import type { IPageApplicationService } from '../page'
import type { IPropService } from '../prop'
import type { IRendererApplicationService } from '../renderer'
import type { IResourceService } from '../resource'
import type { IStoreService } from '../store'
import type { ITagService } from '../tag'
import type { ITypeService } from '../type'
import type { IUserService } from '../user'

/**
 * Initial data to be injected into store
 */
export interface RootStoreData {
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
  builderService: IBuilderDomainService
  componentService: IComponentApplicationService
  domainService: IDomainService
  elementService: IElementService
  fieldService: IFieldService
  pageService: IPageApplicationService
  propService: IPropService
  rendererService: IRendererApplicationService
  resourceService: IResourceService
  storeService: IStoreService
  tagService: ITagService
  typeService: ITypeService
  userService: IUserService

  clear(): void
}

type MaybeContext<T> = Context<T | undefined>

export interface IRootStoreContext {
  actionServiceContext: MaybeContext<IActionService>
  appServiceContext: MaybeContext<IAppService>
  atomDomainServiceContext: MaybeContext<IAtomDomainService>
  atomServiceContext: MaybeContext<IAtomService>
  builderServiceContext: MaybeContext<IBuilderDomainService>
  componentServiceContext: MaybeContext<IComponentApplicationService>
  domainServiceContext: MaybeContext<IDomainService>
  elementServiceContext: MaybeContext<IElementService>
  fieldServiceContext: MaybeContext<IFieldService>
  pageServiceContext: MaybeContext<IPageApplicationService>
  propServiceContext: MaybeContext<IPropService>
  rendererApplicationServiceContext: MaybeContext<IRendererApplicationService>
  resourceServiceContext: MaybeContext<IResourceService>
  storeDomainServiceContext: MaybeContext<IStoreDomainService>
  storeServiceContext: MaybeContext<IStoreService>
  tagServiceContext: MaybeContext<ITagService>
  typeDomainServiceContext: MaybeContext<ITypeDomainService>
  typeServiceContext: MaybeContext<ITypeService>
  userServiceContext: MaybeContext<IUserService>
}
