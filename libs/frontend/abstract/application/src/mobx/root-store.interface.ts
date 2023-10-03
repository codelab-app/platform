import type {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IBuilderService,
  IComponentService,
  IDomainService,
  IElementService,
  IFieldService,
  IPageService,
  IPropService,
  IRenderService,
  IResourceService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/domain'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { IElementApplicationService } from '../element.application.service.interface'

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
  componentService: IComponentService
  domainService: IDomainService
  elementApplicationService: IElementApplicationService
  elementService: IElementService
  fieldService: IFieldService
  pageService: IPageService
  propService: IPropService
  renderService: IRenderService
  resourceService: IResourceService
  storeService: IStoreService
  tagService: ITagService
  typeService: ITypeService
  userService: IUserService
}
