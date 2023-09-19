import type { Auth0IdToken, IUserDTO } from '@codelab/shared/abstract/core'
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
} from '../domain'

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
