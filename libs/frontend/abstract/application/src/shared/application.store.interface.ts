import type {
  IActionDomainService,
  IAppDomainService,
  IAtomDomainService,
  IAuthGuardDomainService,
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
import type { Context } from 'mobx-keystone'
import type { IActionService } from '../action'
import type { IAdminService } from '../admin'
import type { IAppService } from '../app'
import type { IAtomService } from '../atom'
import type { IAuthGuardService } from '../auth-guard'
import type { IBuilderService } from '../builder'
import type { IComponentApplicationService } from '../component'
import type { IDomainService } from '../domain'
import type { IElementService } from '../element'
import type { IFieldService } from '../field'
import type { IPageApplicationService } from '../page'
import type { IPropService } from '../prop'
import type { IRedirectService } from '../redirect'
import type {
  IRendererService,
  IRuntimeComponentService,
  IRuntimeElementService,
  IRuntimePageService,
} from '../renderer'
import type { IResourceService } from '../resource'
import type { ITracerService } from '../services'
import type { IStoreService } from '../store'
import type { ITagService } from '../tag'
import type { ITypeService } from '../type'
import type { IUserService } from '../user'
import type { IRouterService } from './router.service.interface'

/**
 * Initial data to be injected into store
 */

export interface IApplicationStore {
  actionService: IActionService
  adminService: IAdminService
  appService: IAppService
  atomService: IAtomService
  authGuardService: IAuthGuardService
  builderService: IBuilderService
  componentService: IComponentApplicationService
  domainService: IDomainService
  elementService: IElementService
  fieldService: IFieldService
  pageService: IPageApplicationService
  propService: IPropService
  redirectService: IRedirectService
  rendererService: IRendererService
  resourceService: IResourceService
  runtimeComponentService: IRuntimeComponentService
  runtimeElementService: IRuntimeElementService
  runtimePageService: IRuntimePageService
  storeService: IStoreService
  tagService: ITagService
  tracerService: ITracerService
  typeService: ITypeService
  userService: IUserService
}
