import type {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IBuilderService,
  IComponentApplicationService,
  IDomainService,
  IElementApplicationService,
  IElementService,
  IFieldService,
  IPageApplicationService,
  IPropService,
  IRenderService,
  IResourceService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/application'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { AnyModel } from 'mobx-keystone'

/**
 * Initial data to be injected into store
 */
export interface RootStoreData {
  user: Auth0IdToken
}

export interface IRootStore {
  actionService: IActionService
  adminService: IAdminService
  appService: IAppService
  atomService: IAtomService
  builderService: IBuilderService
  componentService: IComponentApplicationService
  domainService: IDomainService
  elementApplicationService: IElementApplicationService
  elementService: IElementService
  fieldService: IFieldService
  pageService: IPageApplicationService
  propService: IPropService
  renderService: IRenderService
  resourceService: IResourceService
  storeService: IStoreService
  tagService: ITagService
  typeService: ITypeService
  userService: IUserService
}
